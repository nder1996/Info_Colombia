package FullStack.InformaColombia.dto.request;

import java.time.LocalDateTime;
import java.util.Date;

public class TareaRequest {

    private Integer id;
    private String titulo;
    private String descripcion;
    private String estado;
    private Integer idUsuario;
    private Integer idEstadoTarea;
    private Date createAt;
    private Date vencimientoTarea;

    // Constructor vacío
    public TareaRequest() {
    }

    // Constructor con todos los campos
    public TareaRequest(Integer id, String titulo, String descripcion, String estado, Integer idUsuario, Integer idEstadoTarea, Date createAt, Date vencimientoTarea) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idUsuario = idUsuario;
        this.idEstadoTarea = idEstadoTarea;
        this.createAt = createAt;
        this.vencimientoTarea = vencimientoTarea;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public Integer getIdEstadoTarea() {
        return idEstadoTarea;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public Date getVencimientoTarea() {
        return vencimientoTarea;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setIdEstadoTarea(Integer idEstadoTarea) {
        this.idEstadoTarea = idEstadoTarea;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public void setVencimientoTarea(Date vencimientoTarea) {
        this.vencimientoTarea = vencimientoTarea;
    }

    // Método toString
    @Override
    public String toString() {
        return "TareaRequest{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", idUsuario=" + idUsuario +
                ", idEstadoTarea=" + idEstadoTarea +
                ", createAt=" + createAt +
                ", vencimientoTarea=" + vencimientoTarea +
                '}';
    }
}
