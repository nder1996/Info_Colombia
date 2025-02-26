package FullStack.InformaColombia.domain.repository;


import FullStack.InformaColombia.application.dto.response.TareasResponse;
import FullStack.InformaColombia.domain.model.Tarea;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TareaRepository {


    @Results(id = "tareaResponseMap", value = {
            @Result(property = "id", column = "idTarea"),
            @Result(property = "titulo", column = "titulo"),
            @Result(property = "descripcion", column = "descripcion"),
            @Result(property = "createAt", column = "create_at"),
            @Result(property = "updateAt", column = "update_at"),
            @Result(property = "estado", column = "estado"),
            @Result(property = "vencimientoTarea", column = "vencimientoTarea"),
            @Result(property = "estadoTarea.id", column = "idEstadoTarea"),
            @Result(property = "estadoTarea.nombre", column = "nombreEstadoTarea"),
            @Result(property = "usuario.id", column = "idUsuario"),
            @Result(property = "usuario.nombre", column = "usuarioNombre"),
            @Result(property = "usuario.email", column = "usuarioEmail")
    })
    @Select("SELECT t.id as idTarea, t.titulo as titulo, t.descripcion as descripcion, t.create_at, t.update_at, t.estado, t.vencimientoTarea, " +
            "et.id as idEstadoTarea, et.nombre as nombreEstadoTarea, " +
            "u.id as idUsuario, u.nombre as usuarioNombre , u.email as usuarioEmail " +
            "FROM TAREAS t " +
            "JOIN USUARIOS u ON t.idUsuario = u.id " +
            "JOIN ESTADOS_TAREA et ON t.idEstadoTarea = et.id " +
            "WHERE t.estado = 'A'")
    List<TareasResponse> getAllTareas();


    @Results(id = "tareaResponseMapXUsername", value = {
            @Result(property = "id", column = "idTarea"),
            @Result(property = "titulo", column = "titulo"),
            @Result(property = "descripcion", column = "descripcion"),
            @Result(property = "createAt", column = "create_at"),
            @Result(property = "updateAt", column = "update_at"),
            @Result(property = "estado", column = "estado"),
            @Result(property = "vencimientoTarea", column = "vencimientoTarea"),
            @Result(property = "estadoTarea.id", column = "idEstadoTarea"),
            @Result(property = "estadoTarea.nombre", column = "nombreEstadoTarea"),
            @Result(property = "usuario.id", column = "idUsuario"),
            @Result(property = "usuario.nombre", column = "usuarioNombre"),
            @Result(property = "usuario.email", column = "usuarioEmail")
    })
    @Select("SELECT t.id as idTarea, t.titulo as titulo, t.descripcion as descripcion, t.create_at, t.update_at, t.estado, t.vencimientoTarea, " +
            "et.id as idEstadoTarea, et.nombre as nombreEstadoTarea, " +
            "u.id as idUsuario, u.nombre as usuarioNombre , u.email as usuarioEmail " +
            "FROM TAREAS t " +
            "JOIN USUARIOS u ON t.idUsuario = u.id " +
            "JOIN ESTADOS_TAREA et ON t.idEstadoTarea = et.id " +
            "WHERE t.estado = 'A' and u.email = #{username}")
    List<TareasResponse> tareasXUsuario(String username);

    @Insert("INSERT INTO TAREAS (titulo, descripcion, estado, idUsuario, idEstadoTarea, create_at, vencimientoTarea) " +
            "VALUES (#{titulo}, #{descripcion}, #{estado}, #{idUsuario}, #{idEstadoTarea}, #{createAt}, #{vencimientoTarea})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Integer insertTareas(Tarea task);

    @Update("UPDATE TAREAS SET titulo = #{titulo}, descripcion = #{descripcion}, estado = #{estado}, " +
            "idUsuario = #{idUsuario}, idEstadoTarea = #{idEstadoTarea}, " +
            "create_at = #{createAt}, vencimientoTarea = #{vencimientoTarea} " +
            "WHERE id = #{id}")
    Integer updateTareas(Tarea task);

    @Update("UPDATE TAREAS SET estado = 'I' WHERE id = #{id}")
    Integer inactivarTarea(Long id);
}
