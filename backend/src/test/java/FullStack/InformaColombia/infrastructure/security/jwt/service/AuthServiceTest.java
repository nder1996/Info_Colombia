package FullStack.InformaColombia.infrastructure.security.jwt.service;

import FullStack.InformaColombia.application.dto.request.UsuarioRequest;
import FullStack.InformaColombia.application.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.domain.model.RolUsuario;
import FullStack.InformaColombia.domain.model.Usuario;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;
import FullStack.InformaColombia.infrastructure.security.jwt.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private Usuario mockUsuario;
    private UsuarioRequest mockUsuarioRequest;
    private UsuarioXRolRequest mockUsuarioXRolRequest;

    @BeforeEach
    void setUp() {
        mockUsuario = new Usuario();
        mockUsuario.setId(1);
        mockUsuario.setNombre("Test User");
        mockUsuario.setEmail("test@example.com");
        mockUsuario.setPassword("encodedPassword");
        mockUsuario.setEstado("A");
        mockUsuarioRequest = new UsuarioRequest();
        mockUsuarioRequest.setNombre("Test User");
        mockUsuarioRequest.setEmail("test@example.com");
        mockUsuarioRequest.setPassword("password123");
        mockUsuarioXRolRequest = new UsuarioXRolRequest();
        mockUsuarioXRolRequest.setIdUsuario(1);
        mockUsuarioXRolRequest.setIdRol(2);
    }

    @Test
    void loadUserByUsername_ExistingUser_ReturnsUser() {
        // Arrange
        when(usuarioRepository.ByUser("test@example.com")).thenReturn(Optional.of(mockUsuario));

        // Act
        UserDetails result = authService.loadUserByUsername("test@example.com");

        // Assert
        assertNotNull(result);
        assertEquals("test@example.com", result.getUsername());
        verify(usuarioRepository, times(1)).ByUser("test@example.com");
    }

    @Test
    void loadUserByUsername_NonExistingUser_ThrowsException() {
        // Arrange
        when(usuarioRepository.ByUser("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            authService.loadUserByUsername("nonexistent@example.com");
        });
        verify(usuarioRepository, times(1)).ByUser("nonexistent@example.com");
    }

    @Test
    void authenticate_ValidCredentials_ReturnsToken() {
        // Arrange
        String username = "test@example.com";
        String password = "password123";
        String token = "jwt-token";

        when(usuarioRepository.ByUser(username)).thenReturn(Optional.of(mockUsuario));
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn(token);

        // Act
        String result = authService.authenticate(username, password);

        // Assert
        assertNotNull(result);
        assertEquals(token, result);
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil, times(1)).generateToken(any(UserDetails.class));
    }

    @Test
    void authenticate_InvalidCredentials_ThrowsException() {
        // Arrange
        String username = "test@example.com";
        String password = "wrongPassword";

        doThrow(new BadCredentialsException("Bad credentials")).when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            authService.authenticate(username, password);
        });
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil, never()).generateToken(any(UserDetails.class));
    }

    @Test
    void crearUsuario_Success_ReturnsSuccessResponse() {
        when(usuarioRepository.insertUser(any(Usuario.class))).thenReturn(1);
        ApiResponse<String> response = authService.crearUsuario(mockUsuarioRequest);
        assertNotNull(response);
        assertEquals(200, response.getMeta().getStatusCode());
        assertEquals("Operación Exitosa", response.getMeta().getMessage());
        assertEquals(mockUsuarioRequest.getEmail(), response.getData());
        verify(usuarioRepository, times(1)).insertUser(any(Usuario.class));
    }

    @Test
    void crearUsuario_Failure_ReturnsErrorResponse() {
        when(usuarioRepository.insertUser(any(Usuario.class))).thenReturn(0);
        ApiResponse<String> response = authService.crearUsuario(mockUsuarioRequest);
        assertNotNull(response);
        assertEquals(400, response.getMeta().getStatusCode());
        assertEquals("Solicitud Incorrecta", response.getMeta().getMessage());
        verify(usuarioRepository, times(1)).insertUser(any(Usuario.class));
    }

    @Test
    void crearUsuario_Exception_ReturnsServerErrorResponse() {
        when(usuarioRepository.insertUser(any(Usuario.class))).thenThrow(new RuntimeException("Database error"));
        ApiResponse<String> response = authService.crearUsuario(mockUsuarioRequest);
        assertNotNull(response);
        assertEquals(500, response.getMeta().getStatusCode());
        assertEquals("Solicitud Incorrecta", response.getMeta().getMessage());
        verify(usuarioRepository, times(1)).insertUser(any(Usuario.class));
    }

    @Test
    void asignacionRolUsuario_Success_ReturnsSuccessResponse() {
        when(usuarioRepository.insertRolUsuario(any(RolUsuario.class))).thenReturn(1);
        ApiResponse<String> response = authService.asignacionRolUsuario(mockUsuarioXRolRequest);
        assertNotNull(response);
        assertEquals(200, response.getMeta().getStatusCode());
        assertEquals("Operación Exitosa", response.getMeta().getMessage());
        verify(usuarioRepository, times(1)).insertRolUsuario(any(RolUsuario.class));
    }

    @Test
    void asignacionRolUsuario_Failure_ReturnsErrorResponse() {
        when(usuarioRepository.insertRolUsuario(any(RolUsuario.class))).thenReturn(0);
        ApiResponse<String> response = authService.asignacionRolUsuario(mockUsuarioXRolRequest);
        assertNotNull(response);
        assertEquals(400, response.getMeta().getStatusCode());
        assertEquals("Solicitud Incorrecta", response.getMeta().getMessage());
        verify(usuarioRepository, times(1)).insertRolUsuario(any(RolUsuario.class));
    }

    @Test
    void asignacionRolUsuario_Exception_ReturnsServerErrorResponse() {
        when(usuarioRepository.insertRolUsuario(any(RolUsuario.class))).thenThrow(new RuntimeException("Database error"));
        ApiResponse<String> response = authService.asignacionRolUsuario(mockUsuarioXRolRequest);
        assertNotNull(response);
        assertEquals(500, response.getMeta().getStatusCode());
        assertEquals("Solicitud Incorrecta", response.getMeta().getMessage());
        verify(usuarioRepository, times(1)).insertRolUsuario(any(RolUsuario.class));
    }
}
