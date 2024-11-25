package pe.muselock.demongfile.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PublicacionDTO extends BaseDTO {
  private Date fechaPublicacion;
  private Integer vistas;
  private Integer likes;

  private ImagenDTO imagen;
  private UsuarioBasicDTO usuario;
}
