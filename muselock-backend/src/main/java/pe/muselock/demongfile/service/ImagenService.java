package pe.muselock.demongfile.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.muselock.demongfile.entity.ImagenEntity;
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
}
