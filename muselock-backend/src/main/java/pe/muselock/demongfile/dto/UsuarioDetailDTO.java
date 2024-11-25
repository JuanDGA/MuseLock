package pe.muselock.demongfile.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UsuarioDetailDTO extends UsuarioBasicDTO {

  List<PublicacionDTO> publicaciones = new ArrayList<>();
}
