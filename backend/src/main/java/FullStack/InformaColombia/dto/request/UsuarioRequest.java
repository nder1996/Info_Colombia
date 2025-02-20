package FullStack.InformaColombia.dto.request;

import FullStack.InformaColombia.entity.Rol;
import lombok.Data;

import java.util.Date;
import java.util.List;


public class UsuarioRequest {

    private String nombre;
    private String password;
    private String email;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
