package FullStack.InformaColombia.application.dto.response;

public class NotificacionResponse {

    private String titulo;
    private String username;
    private String descripcion;

    // Constructor vacío
    public NotificacionResponse() {
    }

    // Constructor con todos los campos
    public NotificacionResponse(String titulo, String username, String descripcion) {
        this.titulo = titulo;
        this.username = username;
        this.descripcion = descripcion;
    }

    // Getters y Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


}
