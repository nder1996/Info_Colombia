package FullStack.InformaColombia.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notificacion {
    private Integer id;
    private Integer idTarea;
    private String tareaTitulo;
    private String nombre;
    private String descripcion;
}
