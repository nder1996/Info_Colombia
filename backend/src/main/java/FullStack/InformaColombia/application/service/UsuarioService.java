package FullStack.InformaColombia.application.service;



import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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




}
