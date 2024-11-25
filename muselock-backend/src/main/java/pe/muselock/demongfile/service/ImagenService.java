package pe.muselock.demongfile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.muselock.demongfile.entity.ImagenEntity;
import pe.muselock.demongfile.repository.ImagenRepository;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

@Slf4j
@Service
public class ImagenService {
  @Autowired
  ImagenRepository imagenRepository;

  @Transactional
  public ImagenEntity registrarImagen(ImagenEntity imagenEntity) throws Exception {
    if (imagenEntity.getUrl() == null) {
      throw new Exception("URL incorrecta");
    }

    return imagenRepository.save(imagenEntity);
  }

  @Transactional
  public ImagenEntity obtenerImagenbyHash(String hash) throws Exception {
    Optional<ImagenEntity> imageEntity = imagenRepository.findByHash(hash);
    return imageEntity.orElse(null);
  }

  @Transactional
  public String calcularHash(byte[] arrayImagen) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    return Base64.getEncoder().encodeToString(md.digest(arrayImagen));
  }
}
