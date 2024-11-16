package pe.muselock.demongfile.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UsuarioDetailDTO extends UsuarioBasicDTO{
       
    List<PublicacionDTO> publicaciones= new ArrayList<>();
}
