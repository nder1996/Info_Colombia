package FullStack.InformaColombia.application.dto.request;

import jakarta.validation.constraints.*;

import java.util.Date;

public class TareaRequest {

    @Min(value = 0, message = "El ID debe ser mayor a -1")
    @Digits(integer = 11, fraction = 0, message = "El ID debe ser un número entero")
    private Integer id;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 500, message = "El título no puede exceder 500 caracteres")
    private String titulo;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotBlank(message = "El username del usuario es obligatorio")
    @Email(message = "Por favor, ingresa una dirección de correo electrónico válida como nombre de usuario.")
    private String username;

    @NotNull(message = "El estado de la tarea es obligatorio")
    private Integer idEstadoTarea;

    @FutureOrPresent(message = "La fecha de vencimiento debe ser presente o futura")
    private Date vencimientoTarea;

    public TareaRequest() {}

    public TareaRequest(Integer id, String titulo, String descripcion, String username, Integer idEstadoTarea, Date vencimientoTarea) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.username = username;
        this.idEstadoTarea = idEstadoTarea;
        this.vencimientoTarea = vencimientoTarea;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getIdEstadoTarea() {
        return idEstadoTarea;
    }

    public void setIdEstadoTarea(Integer idEstadoTarea) {
        this.idEstadoTarea = idEstadoTarea;
    }

    public Date getVencimientoTarea() {
        return vencimientoTarea;
    }

    public void setVencimientoTarea(Date vencimientoTarea) {
        this.vencimientoTarea = vencimientoTarea;
    }

}
