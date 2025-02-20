package FullStack.InformaColombia.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tarea {

    private Integer id;
    private Integer idEstadoTarea;
    private String estadoTareaNombre;
    private Integer idUsuario;
    private String usuarioNombre;
    private String titulo;
    private String descripcion;
    private Date createAt;
    private Date updateAt;
    private String estado;
    private Date vencimientoTarea;
}
