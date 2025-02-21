package FullStack.InformaColombia.domain.model;


import java.util.Date;

public class Tarea {

    private Integer id;
    private Integer idEstadoTarea;
    private Integer idUsuario;
    private String titulo;
    private String descripcion;
    private Date createAt;
    private Date updateAt;
    private String estado;
    private Date vencimientoTarea;

    // Constructor vacío
    public Tarea() {
    }

    public Tarea(Integer id, Integer idEstadoTarea, Integer idUsuario, String titulo, String descripcion, Date createAt, Date updateAt, String estado, Date vencimientoTarea) {
        this.id = id;
        this.idEstadoTarea = idEstadoTarea;
        this.idUsuario = idUsuario;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.estado = estado;
        this.vencimientoTarea = vencimientoTarea;
    }


    public Integer getId() {
        return id;
    }

    public Integer getIdEstadoTarea() {
        return idEstadoTarea;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public String getEstado() {
        return estado;
    }

    public Date getVencimientoTarea() {
        return vencimientoTarea;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setIdEstadoTarea(Integer idEstadoTarea) {
        this.idEstadoTarea = idEstadoTarea;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setVencimientoTarea(Date vencimientoTarea) {
        this.vencimientoTarea = vencimientoTarea;
    }

    // Método toString
    @Override
    public String toString() {
        return "Tarea{" +
                "id=" + id +
                ", idEstadoTarea=" + idEstadoTarea +
                ", idUsuario=" + idUsuario +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                ", estado='" + estado + '\'' +
                ", vencimientoTarea=" + vencimientoTarea +
                '}';
    }
}
