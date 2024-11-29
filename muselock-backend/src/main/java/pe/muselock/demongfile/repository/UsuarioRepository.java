package pe.muselock.demongfile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.muselock.demongfile.entity.UsuarioEntity;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
  List<UsuarioEntity> findByUsuario(String usuario);
}
