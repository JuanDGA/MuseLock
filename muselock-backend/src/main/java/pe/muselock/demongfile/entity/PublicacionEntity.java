package pe.muselock.demongfile.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class PublicacionEntity extends BaseEntity {
  private Integer vistas;
  private Integer likes;

  @Temporal(TemporalType.DATE)
  private Date fechaPublicacion;

  @ManyToOne
  private UsuarioEntity usuario;

  @OneToOne
  private ImagenEntity imagen;
}
