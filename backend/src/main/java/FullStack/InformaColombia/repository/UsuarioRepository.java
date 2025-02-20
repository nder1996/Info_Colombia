package FullStack.InformaColombia.repository;

import FullStack.InformaColombia.entity.RolUsuario;
import FullStack.InformaColombia.entity.Usuario;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

@Mapper
public interface UsuarioRepository {

    @Results(id = "usuarioMap", value = {
            @Result(property = "id", column = "id"),
            @Result(property = "nombre", column = "nombre"),
            @Result(property = "password", column = "password"),
            @Result(property = "email", column = "email"),
            @Result(property = "estado", column = "estado")
    })
    @Select("SELECT * FROM USUARIOS WHERE nombre = #{username} AND estado = 'A'")
    Optional<Usuario> ByUser(String username);

    @Insert("INSERT INTO USUARIOS (nombre, email, password, estado, create_at, update_at) " +
            "VALUES (#{nombre}, #{email}, #{password}, #{estado}, #{createAt}, #{updateAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(Usuario user);

    @Insert("INSERT INTO ROLESXUSUARIO (estado, idRol, idUsuario) VALUES (#{estado}, #{idRol}, #{idUsuario})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertRolUsuario(RolUsuario rolUsuario);
}
