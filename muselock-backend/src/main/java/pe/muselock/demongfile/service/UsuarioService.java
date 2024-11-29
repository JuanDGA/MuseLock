package pe.muselock.demongfile.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UsuarioService {
  @Autowired
  UsuarioRepository usuarioRepository;

  @Transactional
  public UsuarioEntity crearUsuario(UsuarioEntity usuarioEntity) throws Exception {
    if (usuarioEntity.getNombre() == null) {
      log.info(usuarioEntity.getNombre() + "EE");
      throw new Exception("Nombre invalido");
    }
    String usuario = usuarioEntity.getUsuario();
    if (usuario == null)
      throw new Exception("Usuario invalido");

    if (!usuarioRepository.findByUsuario(usuario).isEmpty())
      throw new Exception("Usuario ya existe");

    if (usuarioEntity.getPassword() == null) {
      throw new Exception("Contrasena Invalida");
    }
    return usuarioRepository.save(usuarioEntity);
  }

  @Transactional
  public UsuarioEntity loginUsuario(String usuario, String password) throws EntityNotFoundException {
      List<UsuarioEntity> usuarioEntity=usuarioRepository.findByUsuario(usuario);
      if(usuarioEntity.isEmpty()){
          throw new EntityNotFoundException("Usuario no encontrado");
      }
      if(!usuarioEntity.get(0).getPassword().equals(password)){
        throw new EntityNotFoundException("Contraseña incorrecta");
      }
      return usuarioEntity.get(0);}
    
  public UsuarioEntity obtenerUsuariobyId(Long idUsuario) throws Exception {
    Optional<UsuarioEntity> usuarioEntity = usuarioRepository.findById(idUsuario);
    if (usuarioEntity.isEmpty()) {
      throw new Exception("Usuario no encontrado");
    }

    return usuarioEntity.get();
  }

  @Transactional
  public UsuarioEntity obtenerUsuariobyUsuario(String usuario) throws Exception {
    List<UsuarioEntity> usuarioEntity = usuarioRepository.findByUsuario(usuario);
    if (usuarioEntity.isEmpty()) {
      throw new Exception("Usuario no encontrado");
    }

    return usuarioEntity.get(0);
  }

  @Transactional
  public List<UsuarioEntity> obtenerUsuarios() {
    return usuarioRepository.findAll();
  }
}
