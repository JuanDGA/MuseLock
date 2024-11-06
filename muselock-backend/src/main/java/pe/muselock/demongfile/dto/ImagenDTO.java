package pe.muselock.demongfile.dto;

import lombok.Data;

@Data
public class ImagenDTO extends BaseDTO{
    String url;
    Integer ancho;
    Integer largo;
    String formato;
}
