package FullStack.InformaColombia.Config.Security.Jwt.controller;

import FullStack.InformaColombia.Config.Security.Jwt.dto.JwtRequest;
import FullStack.InformaColombia.Config.Security.Jwt.dto.JwtResponse;
import FullStack.InformaColombia.Config.Security.Jwt.service.AuthService;
import FullStack.InformaColombia.dto.request.UsuarioRequest;
import FullStack.InformaColombia.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.dto.response.ApiResponse;
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
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        String token = authService.authenticate(
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(new JwtResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody UsuarioRequest request) {
        ApiResponse<String> responses = this.authService.crearUsuario(request);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @PostMapping("/asignarRol")
    public ResponseEntity<ApiResponse<String>> asignarRol(@RequestBody UsuarioXRolRequest request) {
        ApiResponse<String> responses = this.authService.asignacionRolUsuario(request);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint de autenticación funcionando");
    }
}
