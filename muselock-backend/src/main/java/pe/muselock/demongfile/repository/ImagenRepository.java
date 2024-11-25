package pe.muselock.demongfile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.muselock.demongfile.entity.ImagenEntity;

import java.util.Optional;

@Repository
public interface ImagenRepository extends JpaRepository<ImagenEntity, Long> {
  Optional<ImagenEntity> findByHash(String hash);

}
