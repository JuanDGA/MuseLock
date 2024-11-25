package pe.muselock.demongfile.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class UsuarioEntity extends BaseEntity {
  private String nombre;
  private String usuario;
  private String correo;
  private String password;
  private String profesion;
  private String descripcion;
  private String ciudad;
  private String pais;

  @OneToMany(mappedBy = "usuario", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<PublicacionEntity> publicaciones = new ArrayList<>();

  @OneToOne
  private ImagenEntity fotoPerfil;
}
