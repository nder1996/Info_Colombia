package FullStack.InformaColombia.infrastructure.security.interceptor;

import FullStack.InformaColombia.domain.model.LogSistemas;
import FullStack.InformaColombia.domain.repository.LogEventoRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.security.Timestamp;
import java.util.Date;

@Component
public class LogInterceptor implements HandlerInterceptor {

    @Autowired
    private LogEventoRepository logRepository;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        LogSistemas log = new LogSistemas();


        log.setIpAddress(request.getRemoteAddr());
        log.setEndpoint(request.getRequestURI());
        log.setCodigoRespuesta(String.valueOf(response.getStatus()));
        log.setCreateAt(new Date());


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails) {
            UserDetails user = (UserDetails) auth.getPrincipal();
            if( user!=null && user.getUsername()!=null && !user.getUsername().isEmpty()){
                log.setIdUsuario(user.getUsername());
            }else{
                log.setIdUsuario("Usuario Invitado");
            }

        }


        log.setTipoEvento(request.getMethod());


        log.setNombre(request.getMethod() + " " + request.getRequestURI());
        log.setDescripcion("Request completed with status: " + response.getStatus());

        logRepository.saveLog(log);
    }


}
