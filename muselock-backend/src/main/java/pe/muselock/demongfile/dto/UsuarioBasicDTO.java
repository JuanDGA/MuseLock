package pe.muselock.demongfile.dto;

import lombok.Data;

@Data
public class UsuarioBasicDTO extends BaseDTO{
    String nombre;
    String usuario;
    ImagenDTO fotoPerfil;
}
