package FullStack.InformaColombia.service;


import FullStack.InformaColombia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public List<Map<String, Object>> rolesXUsuario(String email) {
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




}
