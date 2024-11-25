package pe.muselock.demongfile.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Slf4j
@Service
public class FileSystemStorageService implements StorageService {

  @Value("${media.location}")
  private String mediaLocation;

  private Path rootLocation;

  @Override
  @PostConstruct
  public void init() throws IOException {
    rootLocation = Paths.get(mediaLocation);
    Files.createDirectories(rootLocation);
  }

  @Override
  public String store(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new RuntimeException("Archivo vacio");
      }

      String originalFilename = file.getOriginalFilename();
      String extension = "";

      if (originalFilename != null && originalFilename.contains(".")) {
        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      }

      String filename = UUID.randomUUID() + extension;
      Path destinationFile = rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath();

      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);

      }

      BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
      int width = 0;
      int height = 0;
      if (bufferedImage != null) {
        width = bufferedImage.getWidth();
        height = bufferedImage.getHeight();
      }


      return filename + "," + width + "," + height + "," + extension;
    } catch (IOException e) {
      throw new RuntimeException("Error al guardar el archivo", e);
    }
  }

  @Override
  public Resource loadAsRecource(String filename) {
    try {
      Path file = rootLocation.resolve(filename);
      Resource resource = new UrlResource((file.toUri()));

      if (resource.exists() || resource.isReadable()) {
        return resource;
      } else {
        throw new RuntimeException("No se puede leer el archivo " + filename);
      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("No se pudo leer el archivo " + filename);
    }
  }

}
