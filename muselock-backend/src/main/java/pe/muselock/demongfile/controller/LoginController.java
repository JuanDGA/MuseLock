package pe.muselock.demongfile.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pe.muselock.demongfile.dto.UsuarioBasicDTO;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.service.UsuarioService;


@RestController
@RequestMapping("login")
public class LoginController {
  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private ModelMapper modelMapper;

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public UsuarioBasicDTO autenticar(@RequestParam("usuario") String usuario, @RequestParam("password") String password) throws Exception {
    UsuarioEntity usuarioEntity = usuarioService.obtenerUsuariobyUsuario(usuario);
    if (!(usuarioEntity.getPassword().equals(password))) {
      throw new Exception("Usuario incorrecto");
    }
    return modelMapper.map(usuarioEntity, UsuarioBasicDTO.class);
  }

}
