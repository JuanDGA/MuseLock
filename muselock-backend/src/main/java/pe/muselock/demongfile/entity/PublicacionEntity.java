package pe.muselock.demongfile.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
public class PublicacionEntity extends BaseEntity{
    private Integer vistas;
    private Integer likes;
    
    @Temporal(TemporalType.DATE)
    private Date fechaPublicacion;

    @ManyToOne
    private UsuarioEntity usuario;

    @OneToOne
    private ImagenEntity imagen;
}
