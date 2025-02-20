package FullStack.InformaColombia.Config.Security.Jwt.controller;

import FullStack.InformaColombia.Config.Security.Jwt.dto.JwtRequest;
import FullStack.InformaColombia.Config.Security.Jwt.dto.JwtResponse;
import FullStack.InformaColombia.Config.Security.Jwt.service.AuthenticationService;
import FullStack.InformaColombia.dto.request.UsuarioRequest;
import FullStack.InformaColombia.dto.request.UsuarioXRolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        String token = authService.authenticate(
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UsuarioRequest request) {
        String mensaje = authService.crearUsuario(request);
        return ResponseEntity.ok(mensaje);
    }

    @PostMapping("/asignarRol")
    public ResponseEntity<String> asignarRol(@RequestBody UsuarioXRolRequest request) {
        String mensaje = authService.AsignacionRolUsuario(request);
        return ResponseEntity.ok(mensaje);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint de autenticación funcionando");
    }
}
