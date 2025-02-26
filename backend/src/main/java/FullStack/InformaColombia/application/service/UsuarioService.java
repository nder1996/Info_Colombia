package FullStack.InformaColombia.application.service;



import FullStack.InformaColombia.application.dto.request.UsuarioRequest;
import FullStack.InformaColombia.application.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.domain.model.RolUsuario;
import FullStack.InformaColombia.domain.model.Usuario;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);


    @Autowired
    UsuarioRepository usuarioRepository;

    public ApiResponse<List<Map<String, Object>>> rolesXUsuario(String email) {
        try {
            List<Map<String, Object>> roles = this.usuarioRepository.rolesXUsuario(email);
            if(roles != null && !roles.isEmpty()) {
                return ResponseApiBuilderService.successResponse(roles, "ROLES_ENCONTRADOS", 200);
            }
            return ResponseApiBuilderService.successResponse(List.of(), "NO_ROLES_ENCONTRADOS", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_ROLES", "Error al obtener roles");
        }
    }

    public ApiResponse<List<Map<String, Object>>> getAllUsuario() {
        try {
            List<Map<String, Object>> usuarios = this.usuarioRepository.getAllUsuario();
            if(usuarios != null && !usuarios.isEmpty()) {
                return ResponseApiBuilderService.successResponse(usuarios, "USUARIOS_ENCONTRADOS", 200);
            }
            return ResponseApiBuilderService.successResponse(List.of(), "NO_USUARIOS_ENCONTRADOS", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_USUARIOS", "Error al obtener usuarios");
        }
    }

    public ApiResponse<List<Map<String, Object>>> getAllUsuariosConRol() {
        try {
            List<Map<String, Object>> usuarios = this.usuarioRepository.getAllUsuariosConRol();
            if(usuarios != null && !usuarios.isEmpty()) {
                return ResponseApiBuilderService.successResponse(usuarios, "USUARIOS_ENCONTRADOS", 200);
            }
            return ResponseApiBuilderService.successResponse(List.of(), "NO_USUARIOS_ENCONTRADOS", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_USUARIOS", "Error al obtener usuarios");
        }
    }

    public ApiResponse<String> crearUsuario(UsuarioRequest usuario) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        try {
            Optional<Usuario> existingUser = usuarioRepository.ByUser(usuario.getEmail());
            if (existingUser.isPresent()) {
                return ResponseApiBuilderService.errorResponse(400, "EMAIL_DUPLICADO", "El email ya está registrado");
            }

            Usuario user = new Usuario();
            user.setCreateAt(new Date());
            user.setEstado("A");
            user.setNombre(usuario.getNombre());
            user.setEmail(usuario.getEmail());
            user.setPassword(passwordEncoder.encode(usuario.getPassword()));
            user.setUpdateAt(null);

            int rowAffect = this.usuarioRepository.insertUser(user);
            if (rowAffect > 0) {
                UsuarioXRolRequest usuarioXRolRequest = new UsuarioXRolRequest();
                usuarioXRolRequest.setIdRol(2);
                usuarioXRolRequest.setIdUsuario(user.getId());
                asignacionRolUsuario(usuarioXRolRequest);
                return ResponseApiBuilderService.successResponse(usuario.getEmail(), "Usuario creado exitosamente", 200);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Usar logger en producción
            return ResponseApiBuilderService.errorResponse(500, "INTERNAL_SERVER_ERROR", "Hubo un error en el servidor: " + e.getMessage());
        }
        return ResponseApiBuilderService.errorResponse(400, "CREATION_FAILED", "Hubo un error al crear el usuario");
    }

    public ApiResponse<String> asignacionRolUsuario(UsuarioXRolRequest usuarioXRolRequest) {
        try {

            RolUsuario rolUsuario = new RolUsuario();
            rolUsuario.setEstado("A");
            rolUsuario.setIdUsuario(usuarioXRolRequest.getIdUsuario());
            rolUsuario.setIdRol(usuarioXRolRequest.getIdRol());

            int rowAffect = this.usuarioRepository.insertRolUsuario(rolUsuario);
            if (rowAffect > 0) {
                return ResponseApiBuilderService.successResponse(null, "Rol asignado exitosamente", 200);
            }
            return ResponseApiBuilderService.errorResponse(400, "ERROR_ASIGNAR_ROL", "HUBO UN ERROR AL ASIGNAR ROLES");

        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500,"INTERNAL SERVER ERROR", "INTERNAL SERVER ERROR");
        }
    }

    public ApiResponse<String> actualizarUsuario(UsuarioRequest usuario) {
        try {
            Usuario user = usuarioRepository.ByUser(usuario.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            user.setNombre(usuario.getNombre());
            user.setUpdateAt(new Date());
            if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                user.setPassword(passwordEncoder.encode(usuario.getPassword()));
            }

            RolUsuario rolUsuario =  usuarioRepository.findRolUsuarioByUsuarioAndRol(usuario.getId());
            rolUsuario.setIdRol(usuario.getIdRol());
            usuarioRepository.updateRolUsuario(rolUsuario);

            int rowAffect = usuarioRepository.updateUser(user);
            if (rowAffect > 0) {
                return ResponseApiBuilderService.successResponse(
                        usuario.getEmail(), "Usuario actualizado exitosamente", 200);
            }
            return ResponseApiBuilderService.errorResponse(404, null, "No se pudo actualizar el usuario");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseApiBuilderService.errorResponse(
                    500, "INTERNAL SERVER ERROR", "HUBO UN ERROR EN EL SERVIDOR");
        }
    }

    public ApiResponse<String> inactivarUsuario(String email) {
        try {
            Usuario user = usuarioRepository.ByUser(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            user.setEstado("I");
            user.setUpdateAt(new Date());

            int rowAffect = usuarioRepository.updateUser(user);
            if (rowAffect > 0) {
                return ResponseApiBuilderService.successResponse(
                        email, "Usuario inactivado exitosamente", 200);
            }
            return ResponseApiBuilderService.errorResponse(404, null, "No se pudo inactivar el usuario");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseApiBuilderService.errorResponse(
                    500, "INTERNAL SERVER ERROR", "HUBO UN ERROR EN EL SERVIDOR");
        }
}

}
