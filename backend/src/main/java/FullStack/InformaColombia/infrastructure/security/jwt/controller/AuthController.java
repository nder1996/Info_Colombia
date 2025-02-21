package FullStack.InformaColombia.infrastructure.security.jwt.controller;

import FullStack.InformaColombia.application.dto.request.UsuarioRequest;
import FullStack.InformaColombia.application.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.infrastructure.security.jwt.dto.JwtRequest;
import FullStack.InformaColombia.infrastructure.security.jwt.dto.JwtResponse;
import FullStack.InformaColombia.infrastructure.security.jwt.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody JwtRequest request) {
        String token = authService.authenticate(
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(new JwtResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody UsuarioRequest request) {
        ApiResponse<String> responses = this.authService.crearUsuario(request);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @PostMapping("/asignarRol")
    public ResponseEntity<ApiResponse<String>> asignarRol(@Valid @RequestBody UsuarioXRolRequest request) {
        ApiResponse<String> responses = this.authService.asignacionRolUsuario(request);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint de autenticación funcionando");
    }
}
