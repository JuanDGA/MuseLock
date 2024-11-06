package pe.muselock.demongfile.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

// import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pe.muselock.demongfile.dto.PublicacionDTO;
import pe.muselock.demongfile.entity.ImagenEntity;
import pe.muselock.demongfile.entity.PublicacionEntity;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.service.ImagenService;
import pe.muselock.demongfile.service.PublicacionService;
import pe.muselock.demongfile.service.StorageService;
import pe.muselock.demongfile.service.UsuarioService;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;



@RestController
@RequestMapping("media")
@Slf4j
@AllArgsConstructor
public class MediaController {
    private final StorageService storageService;
    private final HttpServletRequest request;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private PublicacionService publicacionService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("upload/")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile multipartFile, @RequestParam("id") Long id) throws Exception {
        UsuarioEntity usuarioEntity = usuarioService.obtenerUsuariobyId(id);

        String[] info = storageService.store(multipartFile).split(",");
        String path = info[0];
        String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");

        Integer ancho = Integer.valueOf(info[1]);
        Integer largo = Integer.valueOf(info[2]);

        String url = ServletUriComponentsBuilder
        .fromHttpUrl(host)
        .path("/api/media/")
        .path(path)
        .toUriString();  
        

        ImagenEntity imagenEntity = new ImagenEntity();
        imagenEntity.setAncho(ancho);
        imagenEntity.setLargo(largo);
        imagenEntity.setFormato(info[3]);
        imagenEntity.setUrl(url);

        ImagenEntity imagen = imagenService.registrarImagen(imagenEntity);


        PublicacionEntity publicacionEntity = new PublicacionEntity();
        publicacionEntity.setFechaPublicacion(new Date());
        publicacionEntity.setLikes(0);
        publicacionEntity.setVistas(0);
        publicacionEntity.setUsuario(usuarioEntity);
        publicacionEntity.setImagen(imagen);

        publicacionService.crearPublicacion(publicacionEntity);
        
        return Map.of("url", url);
    }
    
    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException{
        Resource file = storageService.loadAsRecource(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());
        
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType).body(file);
    }

    @GetMapping("publicaciones/")
    public List<PublicacionDTO> getPublicaciones(){
        List<PublicacionEntity> publicaciones= publicacionService.publicaciones();
        return modelMapper.map(publicaciones, new TypeToken<List<PublicacionDTO>>(){}.getType());
    }
    
}

