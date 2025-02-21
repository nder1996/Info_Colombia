package FullStack.InformaColombia.application.dto.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UsuarioXRolRequest {

    @NotNull(message = "El ID de usuario es obligatorio")
    @Min(value = 1, message = "El ID de usuario debe ser mayor a 0")
    @Digits(integer = 11, fraction = 0, message = "El ID de usuario debe ser un número entero")
    private Integer idUsuario;

    @NotNull(message = "El ID de rol es obligatorio")
    @Min(value = 1, message = "El ID de rol debe ser mayor a 0")
    @Digits(integer = 11, fraction = 0, message = "El ID de rol debe ser un número entero")
    private Integer idRol;


    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }
}
