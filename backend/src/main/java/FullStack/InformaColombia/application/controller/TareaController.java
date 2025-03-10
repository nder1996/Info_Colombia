package FullStack.InformaColombia.application.controller;


import FullStack.InformaColombia.application.dto.request.TareaRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.dto.response.TareasResponse;
import FullStack.InformaColombia.application.service.TareaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarea")
public class TareaController {

    @Autowired
    TareaService tareaService;

    @GetMapping("/tareas")
    public ResponseEntity<ApiResponse<List<TareasResponse>>> tareas() {
        ApiResponse<List<TareasResponse>> responses = this.tareaService.getAllTareas();
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @GetMapping("/tareasXUsuario/{username}")
    public ResponseEntity<ApiResponse<List<TareasResponse>>> tareasXUsuario(@Valid  @PathVariable String username) {
        ApiResponse<List<TareasResponse>> responses = this.tareaService.tareasXUsuario(username);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @PostMapping("/createTarea")
    public ResponseEntity<ApiResponse<String>> createTarea(@Valid @RequestBody TareaRequest task) {
        ApiResponse<String> responses = this.tareaService.createTarea(task);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }

    @PutMapping("/updateTarea")
    public ResponseEntity<ApiResponse<String>> updateTarea(@Valid @RequestBody TareaRequest task) {
        ApiResponse<String> responses = this.tareaService.updateTarea(task);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }
    @PutMapping("/inactivarTarea/{id}")
    public ResponseEntity<ApiResponse<String>> inactivarTarea(@Valid @PathVariable Long id) {
        ApiResponse<String> responses = this.tareaService.inactivarTarea(id);
        return ResponseEntity.status(responses.getMeta().getStatusCode()).body(responses);
    }


}
