package pe.muselock.demongfile.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PublicacionDTO extends BaseDTO{
    private Date fechaPublicacion;
    private Integer vistas;
    private Integer likes;

    private ImagenDTO imagen;
}
