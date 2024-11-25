package pe.muselock.demongfile.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.muselock.demongfile.entity.ImagenEntity;
import pe.muselock.demongfile.entity.PublicacionEntity;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.repository.ImagenRepository;
import pe.muselock.demongfile.repository.PublicacionRepository;
import pe.muselock.demongfile.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PublicacionService {
  @Autowired
  PublicacionRepository publicacionRepository;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Autowired
  ImagenRepository imagenRepository;

  @Transactional
  public PublicacionEntity crearPublicacion(PublicacionEntity publicacionEntity) throws Exception {
    Optional<UsuarioEntity> usuario = usuarioRepository.findById(publicacionEntity.getUsuario().getId());
    if (usuario.isEmpty()) {
      throw new Exception("Usuario Invalido para la publicacion");
    }

    Optional<ImagenEntity> imagen = imagenRepository.findById(publicacionEntity.getImagen().getId());
    if (imagen.isEmpty()) {
      throw new Exception("Imagen no encontrada");
    }

    if (publicacionEntity.getFechaPublicacion() == null)
      throw new Exception("La fecha de publicacion debe estar establecida");

    return publicacionRepository.save(publicacionEntity);
  }

  @Transactional
  public List<PublicacionEntity> publicaciones() {
    return publicacionRepository.findAll();
  }

  @Transactional
  public PublicacionEntity getPublicacion(Long publicacionId) throws EntityNotFoundException {
    log.info("Inicia proceso de consultar el libro con id = {0}", publicacionId);
    Optional<PublicacionEntity> publicacionEntity = publicacionRepository.findById(publicacionId);
    if (publicacionEntity.isEmpty())
      throw new EntityNotFoundException("Publicacion no encotrada");
    log.info("Termina proceso de consultar el libro con id = {0}", publicacionId);
    return publicacionEntity.get();
  }
}
