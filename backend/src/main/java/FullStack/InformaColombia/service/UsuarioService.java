package FullStack.InformaColombia.service;


import FullStack.InformaColombia.dto.response.ApiResponse;
import FullStack.InformaColombia.repository.UsuarioRepository;
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
        logger.info("👥 Buscando roles para usuario: {}", email);
        try {
            List<Map<String, Object>> roles = this.usuarioRepository.rolesXUsuario(email);
            if(roles != null && !roles.isEmpty()) {
                logger.info("✅ Roles encontrados para usuario: {}", email);
                return ResponseApiBuilderService.successResponse(roles, "ROLES_ENCONTRADOS", 200);
            }
            logger.warn("⚠️ No se encontraron roles para: {}", email);
            return ResponseApiBuilderService.successResponse(List.of(), "NO_ROLES_ENCONTRADOS", 204);
        } catch (Exception e) {
            logger.error("❌ Error al buscar roles: {}", e.getMessage(), e);
            return ResponseApiBuilderService.errorResponse(500, "ERROR_ROLES", "Error al obtener roles");
        }
    }

    public ApiResponse<List<Map<String, Object>>> getAllUsuario() {
        logger.info("👥 Obteniendo lista de usuarios");
        try {
            List<Map<String, Object>> usuarios = this.usuarioRepository.getAllUsuario();
            if(usuarios != null && !usuarios.isEmpty()) {
                logger.info("✅ Se encontraron {} usuarios", usuarios.size());
                return ResponseApiBuilderService.successResponse(usuarios, "USUARIOS_ENCONTRADOS", 200);
            }
            logger.warn("⚠️ No se encontraron usuarios");
            return ResponseApiBuilderService.successResponse(List.of(), "NO_USUARIOS_ENCONTRADOS", 204);
        } catch (Exception e) {
            logger.error("❌ Error al obtener usuarios: {}", e.getMessage(), e);
            return ResponseApiBuilderService.errorResponse(500, "ERROR_USUARIOS", "Error al obtener usuarios");
        }
    }



    /*public List<Map<String, Object>> rolesXUsuario(String email) {
        try {
            List<Map<String, Object>> roles = this.usuarioRepository.rolesXUsuario(email);
            if(roles != null && !roles.isEmpty()) {
                return roles;
            }
            return List.of();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return List.of();
        }
    }

    public List<Map<String, Object>> getAllUsuario() {
        try {
            List<Map<String, Object>> usuarios = this.usuarioRepository.getAllUsuario();
            if(usuarios != null && !usuarios.isEmpty()) {
                return usuarios;
            }
            return List.of();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return List.of();
        }
    }
*/



}
