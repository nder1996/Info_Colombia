package FullStack.InformaColombia.repository;

import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.entity.Usuario;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;

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
            @Result(property = "usuario.nombre", column = "usuarioNombre")
    })
    @Select("SELECT t.id as idTarea, t.titulo as titulo, t.descripcion as descripcion, t.create_at, t.update_at, t.estado, t.vencimientoTarea, " +
            "et.id as idEstadoTarea, et.nombre as nombreEstadoTarea, " +
            "u.id as idUsuario, u.nombre as usuarioNombre " +
            "FROM TAREAS t " +
            "JOIN USUARIOS u ON t.idUsuario = u.id " +
            "JOIN ESTADOS_TAREA et ON t.idEstadoTarea = et.id " +
            "WHERE t.estado = 'A'")
    List<TareasResponse> getAllTareas();
}
