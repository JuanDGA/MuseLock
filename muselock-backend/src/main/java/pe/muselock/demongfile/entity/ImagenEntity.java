package pe.muselock.demongfile.entity;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class ImagenEntity extends BaseEntity{
    private String url;
    private Integer ancho;
    private Integer largo;
    private String formato;
}
