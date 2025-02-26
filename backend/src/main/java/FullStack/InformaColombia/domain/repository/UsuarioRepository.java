package FullStack.InformaColombia.domain.repository;

import FullStack.InformaColombia.domain.model.RolUsuario;
import FullStack.InformaColombia.domain.model.Usuario;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
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
    @Select("SELECT * FROM USUARIOS WHERE email = #{username} AND estado = 'A'")
    Optional<Usuario> ByUser(String username);

    @Insert("INSERT INTO USUARIOS (nombre, email, password, estado, create_at, update_at) " +
            "VALUES (#{nombre}, #{email}, #{password}, #{estado}, #{createAt}, #{updateAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(Usuario user);

    @Insert("INSERT INTO ROLESXUSUARIO (estado, idRol, idUsuario) VALUES (#{estado}, #{idRol}, #{idUsuario})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertRolUsuario(RolUsuario rolUsuario);

    @Select("SELECT * FROM ROLESXUSUARIO WHERE idUsuario = #{idUsuario}")
    RolUsuario findRolUsuarioByUsuarioAndRol(@Param("idUsuario") Integer idUsuario);

    @Update("UPDATE ROLESXUSUARIO SET idRol = #{idRol} WHERE id = #{id}")
    int updateRolUsuario(RolUsuario rolUsuario);



    @Select("""
    SELECT ROLESXUSUARIO.id, ROL.id as idRol, ROL.nombre as nombreRol, 
    USERI.id as idUsuario, USERI.nombre as nombreCompleto
    FROM ROLESXUSUARIO AS ROLESXUSUARIO
    LEFT JOIN ROLES AS ROL ON ROLESXUSUARIO.idRol = ROL.id
    LEFT JOIN USUARIOS AS USERI ON ROLESXUSUARIO.idUsuario = USERI.id
    WHERE ROLESXUSUARIO.estado = 'A'
    AND USERI.email = #{email} 
    """)
    List<Map<String, Object>> rolesXUsuario(@Param("email") String email);


    @Select("""
        SELECT
            USERI.id,
            USERI.nombre,
            USERI.email
        FROM USUARIOS AS USERI
        WHERE USERI.estado = 'A'
""")
    List<Map<String, Object>> getAllUsuario();


    @Update("UPDATE USUARIOS SET nombre = #{nombre}, email = #{email}, " +
            "estado = #{estado}, update_at = #{updateAt} WHERE id = #{id}")
    int updateUser(Usuario user);

    @Update("UPDATE USUARIOS SET estado = 'I', update_at = #{updateAt} WHERE id = #{id}")
    int deleteUser(@Param("id") Integer id, @Param("updateAt") Date updateAt);

    @Select("""
        select useri.id , useri.nombre , useri.nombre , useri.email , useri.estado , useri.create_at as fechaRegistro , rol.nombre as rol , rol.id as idRol   
        from
        USUARIOS as useri
        left join ROLESXUSUARIO as userRol on useri.id = userRol.idUsuario
        left join ROLES as rol on userRol.idRol = rol.id
        """)
    List<Map<String, Object>> getAllUsuariosConRol();
}
