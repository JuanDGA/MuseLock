package pe.muselock.demongfile.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.muselock.demongfile.dto.PublicacionDTO;
import pe.muselock.demongfile.entity.ImagenEntity;
import pe.muselock.demongfile.entity.PublicacionEntity;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.service.*;

import java.io.IOException;
import java.nio.file.Files;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("media")
@Slf4j
@AllArgsConstructor
public class MediaController {
  private final StorageService storageService;
  private final SimilarityService similarityService;
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
  public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws Exception {
    UsuarioEntity usuarioEntity = usuarioService.obtenerUsuariobyId(1l);

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
    String hash = imagenService.calcularHash(multipartFile.getBytes());

    double mostSimilar = similarityService.checkSimilarity(multipartFile.getBytes());

    if (mostSimilar > 0.85)
      return ResponseEntity.badRequest().body(Map.of("error", "Image already exists"));

    ImagenEntity imagenEntity = new ImagenEntity();
    imagenEntity.setAncho(ancho);
    imagenEntity.setLargo(largo);
    imagenEntity.setFormato(info[3]);
    imagenEntity.setUrl(url);
    imagenEntity.setHash(hash);

    ImagenEntity imagen = imagenService.registrarImagen(imagenEntity);

    similarityService.save(multipartFile.getBytes(), imagen.getId());

    PublicacionEntity publicacionEntity = new PublicacionEntity();
    publicacionEntity.setFechaPublicacion(new Date());
    publicacionEntity.setLikes(0);
    publicacionEntity.setVistas(0);
    publicacionEntity.setUsuario(usuarioEntity);
    publicacionEntity.setImagen(imagen);
    publicacionService.crearPublicacion(publicacionEntity);

    return ResponseEntity.ok(Map.of("url", url, "hash", hash));
  }

  @GetMapping("{filename:.+}")
  public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
    Resource file = storageService.loadAsRecource(filename);
    String contentType = Files.probeContentType(file.getFile().toPath());

    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType).body(file);
  }

  @GetMapping("publicaciones/")
  public List<PublicacionDTO> getPublicaciones() {
    List<PublicacionEntity> publicaciones = publicacionService.publicaciones();
    return modelMapper.map(publicaciones, new TypeToken<List<PublicacionDTO>>() {
    }.getType());
  }

  @GetMapping(value = "publicaciones/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public PublicacionDTO findOne(@PathVariable Long id) throws EntityNotFoundException {
    PublicacionEntity bookEntity = publicacionService.getPublicacion(id);
    return modelMapper.map(bookEntity, PublicacionDTO.class);
  }

}

