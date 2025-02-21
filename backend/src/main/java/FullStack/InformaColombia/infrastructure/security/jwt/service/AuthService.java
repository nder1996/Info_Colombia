package FullStack.InformaColombia.infrastructure.security.jwt.service;

import FullStack.InformaColombia.application.dto.request.UsuarioRequest;
import FullStack.InformaColombia.application.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.service.ResponseApiBuilderService;
import FullStack.InformaColombia.domain.model.RolUsuario;
import FullStack.InformaColombia.domain.model.Usuario;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;

import FullStack.InformaColombia.infrastructure.security.jwt.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.ByUser(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }


    public String authenticate(String username, String password) {
        try {
            logger.info("🔑 Intentando autenticar al usuario: {}", username);

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password, null)
            );

            final UserDetails userDetails = loadUserByUsername(username);
            String token = jwtTokenUtil.generateToken(userDetails);

            logger.info("✅ Usuario autenticado exitosamente: {}", username);
            return token;

        } catch (BadCredentialsException e) {
            logger.error("❌ Error de autenticación para usuario: {}", username, e);
            throw e;
        }
    }



    public ApiResponse<String> crearUsuario(UsuarioRequest usuario) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        try {
            logger.info("👤 Iniciando creación de usuario: {}", usuario.getEmail());

            Usuario user = new Usuario();
            user.setCreateAt(new Date());
            user.setEstado("A");
            user.setNombre(usuario.getNombre());
            user.setEmail(usuario.getEmail());
            user.setPassword(passwordEncoder.encode(usuario.getPassword()));
            user.setUpdateAt(null);

            int rowAffect = this.usuarioRepository.insertUser(user);
            if (rowAffect > 0) {
                logger.info("✅ Usuario creado exitosamente: {}", usuario.getEmail());
                return ResponseApiBuilderService.successResponse(usuario.getEmail(), "Usuario creado exitosamente", 200);
            }
        } catch (Exception e) {
            logger.error("❌ Error interno al crear usuario: {}", usuario.getEmail(), e);
            e.getStackTrace();
            return ResponseApiBuilderService.errorResponse(500,"INTERNAL SERVER ERROR", "HUBO UN ERROR EN EL SERVIDOR");
        }
        logger.error("⚠️ Error al crear usuario: {}", usuario.getEmail());
        return ResponseApiBuilderService.errorResponse(400,null, "Hubo un error al crear el usuario");
    }


    public ApiResponse<String> asignacionRolUsuario(UsuarioXRolRequest usuarioXRolRequest) {
        try {
            logger.info("👥 Iniciando asignación de rol para usuario ID: {}", usuarioXRolRequest.getIdUsuario());

            RolUsuario rolUsuario = new RolUsuario();
            rolUsuario.setEstado("A");
            rolUsuario.setIdUsuario(usuarioXRolRequest.getIdUsuario());
            rolUsuario.setIdRol(usuarioXRolRequest.getIdRol());

            int rowAffect = this.usuarioRepository.insertRolUsuario(rolUsuario);
            if (rowAffect > 0) {
                logger.info("✅ Rol asignado exitosamente al usuario ID: {}", usuarioXRolRequest.getIdUsuario());
                return ResponseApiBuilderService.successResponse(null, "Rol asignado exitosamente", 200);
            }
            logger.error("⚠️ Error al asignar rol al usuario ID: {}", usuarioXRolRequest.getIdUsuario());
            return ResponseApiBuilderService.errorResponse(400, "ERROR_ASIGNAR_ROL", "HUBO UN ERROR AL ASIGNAR ROLES");

        } catch (Exception e) {
            logger.error("❌ Error interno al asignar rol: {}", e.getMessage(), e);
            return ResponseApiBuilderService.errorResponse(500,"INTERNAL SERVER ERROR", "INTERNAL SERVER ERROR");
        }
    }

}
