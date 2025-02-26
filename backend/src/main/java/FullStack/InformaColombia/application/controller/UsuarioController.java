package FullStack.InformaColombia.application.controller;

import FullStack.InformaColombia.application.dto.request.UsuarioRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.service.SummaryService;
import FullStack.InformaColombia.application.service.UsuarioService;
import FullStack.InformaColombia.domain.model.EstadoTarea;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/getRolesXUsuario/{username}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getRolesXUsuario(
            @Valid
            @NotBlank(message = "Username no puede estar vacío")
            @Size(min=3, max=50, message = "Username debe tener entre 3 y 50 caracteres")
            @Email(message = "Formato de Username inválido")
            @PathVariable String username
    ) {
        ApiResponse<List<Map<String, Object>>> response = this.usuarioService.rolesXUsuario(username);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }

    @GetMapping("/getAllUsuario")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsuario() {
        ApiResponse<List<Map<String, Object>>> response = this.usuarioService.getAllUsuario();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAllUsuariosConRol")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsuariosConRol() {
        ApiResponse<List<Map<String, Object>>> response = this.usuarioService.getAllUsuariosConRol();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse<String>> actualizarUsuario(@Valid @RequestBody UsuarioRequest request) {
        ApiResponse<String> response = usuarioService.actualizarUsuario(request);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }
    @PostMapping("/crear")
    public ResponseEntity<ApiResponse<String>> crearUsuario(@Valid @RequestBody UsuarioRequest request) {
        ApiResponse<String> response = usuarioService.crearUsuario(request);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }


    @PutMapping("/inactivar/{email}")
    public ResponseEntity<ApiResponse<String>> inactivarUsuario(@Valid @NotBlank(message = "Username no puede estar vacío")
          @Size(min=3, max=50, message = "Username debe tener entre 3 y 50 caracteres")
          @Email(message = "Formato de Username inválido")
          @PathVariable String username) {
        ApiResponse<String> response = usuarioService.inactivarUsuario(username);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }
}
