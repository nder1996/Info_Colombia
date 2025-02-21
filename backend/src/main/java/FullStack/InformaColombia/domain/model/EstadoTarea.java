package FullStack.InformaColombia.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

public class EstadoTarea {

    private Integer id;
    private String nombre;
    private String descripcion;
    private String estado;

    public EstadoTarea() {
    }

    public EstadoTarea(Integer id, String nombre, String descripcion, String estado) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    // Getter para estado
    public String getEstado() {
        return estado;
    }

    // Setter para estado
    public void setEstado(String estado) {
        this.estado = estado;
    }


    @Override
    public String toString() {
        return "EstadoTarea{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
