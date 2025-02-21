package FullStack.InformaColombia.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


public class LogSistema {
    private Integer id;
    private String nombre;
    private String descripcion;
    private Integer idUsuario;
    private String usuarioNombre;
    private Integer idTarea;
    private String tareaTitulo;
    private Date createAt;
}
