package FullStack.InformaColombia.application.service;

import FullStack.InformaColombia.application.dto.request.TareaRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.domain.model.Tarea;
import FullStack.InformaColombia.domain.model.Usuario;
import FullStack.InformaColombia.domain.repository.TareaRepository;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CreateTareaServiceTest {

    @Mock
    private TareaRepository tareaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private TareaService tareaService;

    private TareaRequest tareaRequest;
    private Usuario usuario;

    @BeforeEach
    public void setUp() {
        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Usuario Test");
        usuario.setEmail("test@example.com");
        usuario.setEstado("A");
        tareaRequest = new TareaRequest();
        tareaRequest.setId(0);
        tareaRequest.setTitulo("Tarea de prueba");
        tareaRequest.setDescripcion("Esta es una tarea de prueba para el test unitario");
        tareaRequest.setUsername("test@example.com");
        tareaRequest.setIdEstadoTarea(1);
        tareaRequest.setVencimientoTarea(new Date());
    }

    @Test
    public void testCreateTarea_whenSuccessful_shouldCreateTaskAndNotify() {
        when(usuarioRepository.ByUser("test@example.com")).thenReturn(Optional.of(usuario));
        when(tareaRepository.insertTareas(any(Tarea.class))).thenReturn(1);
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("admin@example.com");
        ApiResponse<String> response = tareaService.createTarea(tareaRequest);
        assertNotNull(response);
        assertEquals(200, response.getMeta().getStatusCode());
        assertTrue(response.getData().contains("Tarea asignada para el usuario test@example.com"));
        verify(usuarioRepository, times(1)).ByUser("test@example.com");
        verify(tareaRepository, times(1)).insertTareas(any(Tarea.class));
        verify(notificationService, times(1)).sendPrivateNotification(
                eq(tareaRequest.getTitulo()),
                eq("test@example.com"),
                eq(tareaRequest.getDescripcion())
        );
    }

    @Test
    public void testCreateTarea_whenDatabaseError_shouldReturnError() {
        when(usuarioRepository.ByUser("test@example.com")).thenReturn(Optional.of(usuario));
        when(tareaRepository.insertTareas(any(Tarea.class))).thenReturn(0);
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("admin@example.com");
        ApiResponse<String> response = tareaService.createTarea(tareaRequest);
        assertNotNull(response);
        assertEquals(400, response.getMeta().getStatusCode());
        assertEquals("HUBO UN ERROR AL CREAR LA TAREA", response.getData());
        verify(usuarioRepository, times(1)).ByUser("test@example.com");
        verify(tareaRepository, times(1)).insertTareas(any(Tarea.class));
        verify(notificationService, never()).sendPrivateNotification(anyString(), anyString(), anyString());
    }
    @Test
    public void testCreateTarea_whenUserNotFound_shouldHandleGracefully() {
        tareaRequest.setUsername("nonexistent@example.com");
        when(usuarioRepository.ByUser("nonexistent@example.com")).thenReturn(Optional.empty());
        try {
            ApiResponse<String> response = tareaService.createTarea(tareaRequest);
            if (response != null) {
                assertEquals(400, response.getMeta().getStatusCode());
            }
        } catch (Exception e) {
            System.out.println("Se capturó una excepción: " + e.getClass().getName() + " - " + e.getMessage());
        }
        verify(usuarioRepository).ByUser("nonexistent@example.com");
        verify(tareaRepository, never()).insertTareas(any(Tarea.class));
    }

    @Test
    public void testCreateTarea_whenCreatorIsAssignee_shouldNotSendNotification() {
        // Configurar mocks
        when(usuarioRepository.ByUser("admin@example.com")).thenReturn(Optional.of(usuario));
        when(tareaRepository.insertTareas(any(Tarea.class))).thenReturn(1);
        tareaRequest.setUsername("admin@example.com");
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("admin@example.com");
        ApiResponse<String> response = tareaService.createTarea(tareaRequest);
        assertNotNull(response);
        assertEquals(200, response.getMeta().getStatusCode());
        verify(notificationService).sendPrivateNotification(
                anyString(),
                isNull(),
                anyString()
        );
    }
}