package pe.muselock.demongfile.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UsuarioDetailDTO extends UsuarioBasicDTO{
    String correo;
    String profesion;
    String descripcion;
    String ciudad;
    String pais;
    String password;
    
    List<PublicacionDTO> publicaciones= new ArrayList<>();
}
