package FullStack.InformaColombia.domain.repository;

import FullStack.InformaColombia.domain.model.LogSistemas;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.springframework.security.core.Authentication;

@Mapper
public interface LogEventoRepository {

    @Insert("INSERT INTO LOG_SISTEMAS (nombre, descripcion, idUsuario, create_at, tipo_evento, ip_address, endpoint, codigo_respuesta) " +
            "VALUES (#{nombre}, #{descripcion}, #{idUsuario}, #{createAt}, #{tipoEvento}, #{ipAddress}, #{endpoint}, #{codigoRespuesta})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Integer saveLog(LogSistemas logSistemas);

}
