package pe.muselock.demongfile.service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.muselock.demongfile.entity.ImagenEntity;
import pe.muselock.demongfile.entity.UsuarioEntity;
import pe.muselock.demongfile.repository.ImagenRepository;

@Slf4j
@Service
public class ImagenService {
    @Autowired
    ImagenRepository imagenRepository;

    @Transactional
    public ImagenEntity registrarImagen(ImagenEntity imagenEntity) throws Exception{
        if(imagenEntity.getUrl() == null){
            throw new Exception("URL incorrecta");
        }

        return imagenRepository.save(imagenEntity);
    }

    @Transactional
    public ImagenEntity obtenerImagenbyHash(String hash) throws Exception{
        Optional<ImagenEntity> imageEntity = imagenRepository.findByHash(hash);
        if(imageEntity.isEmpty()){
            throw new Exception("Imagen no encontrada");
        }
        return imageEntity.get();
    }

    @Transactional
    public String calcularHash(byte[] arrayImagen) throws NoSuchAlgorithmException{
        MessageDigest md= MessageDigest.getInstance("SHA-256");
        return new String(md.digest(arrayImagen));
    }

}
