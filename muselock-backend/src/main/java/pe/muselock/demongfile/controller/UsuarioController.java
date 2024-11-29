package pe.muselock.demongfile.controller;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pe.muselock.demongfile.dto.UsuarioBasicDTO;
import pe.muselock.demongfile.dto.UsuarioDetailDTO;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private ModelMapper modelMapper;

  @GetMapping
  @ResponseStatus(code = HttpStatus.OK)
  public List<UsuarioEntity> findAll() {
    List<UsuarioEntity> usuarios = usuarioService.obtenerUsuarios();
    return modelMapper.map(usuarios, new TypeToken<List<UsuarioBasicDTO>>() {
    }.getType());
  }


  @GetMapping(value = "/{usuario}")
  @ResponseStatus(code = HttpStatus.OK)
  public UsuarioBasicDTO findOne(@PathVariable("usuario") Long id) throws Exception{
      UsuarioEntity usuario = usuarioService.obtenerUsuariobyId(id);
      return modelMapper.map(usuario, UsuarioBasicDTO.class);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public UsuarioBasicDTO create(@RequestBody UsuarioDetailDTO usuarioDTO) throws Exception {
    UsuarioEntity usuarioEntity = usuarioService.crearUsuario(modelMapper.map(usuarioDTO, UsuarioEntity.class));
    return modelMapper.map(usuarioEntity, UsuarioBasicDTO.class);
  }

}
