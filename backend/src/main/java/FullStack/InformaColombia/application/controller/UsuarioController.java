package FullStack.InformaColombia.application.controller;

import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.service.SummaryService;
import FullStack.InformaColombia.application.service.UsuarioService;
import FullStack.InformaColombia.domain.model.EstadoTarea;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/getRolesXUsuario/{username}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> tareas(@Valid @PathVariable String username) {
        ApiResponse<List<Map<String, Object>>> response = this.usuarioService.rolesXUsuario(username);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }

    @GetMapping("/getAllUsuario")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsuario() {
        ApiResponse<List<Map<String, Object>>> response = this.usuarioService.getAllUsuario();
        return ResponseEntity.ok(response);
    }
}
