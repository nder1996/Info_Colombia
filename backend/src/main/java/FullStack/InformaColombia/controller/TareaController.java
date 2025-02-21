package FullStack.InformaColombia.controller;

import FullStack.InformaColombia.dto.request.TareaRequest;
import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.service.TareaService;
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
    public ResponseEntity<List<TareasResponse>> tareas() {
        List<TareasResponse> responses = this.tareaService.getAllTareas();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/tareasXUsuario/{username}")
    public ResponseEntity<List<TareasResponse>> tareasXUsuario(@PathVariable String username) {
        List<TareasResponse> responses = this.tareaService.tareasXUsuario(username);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/createTarea")
    public ResponseEntity<String> createTarea(@RequestBody TareaRequest task) {
        String responses = this.tareaService.createTarea(task);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/updateTarea")
    public ResponseEntity<String> updateTarea(@RequestBody TareaRequest task) {
        String responses = this.tareaService.updateTarea(task);
        return ResponseEntity.ok(responses);
    }
    @PutMapping("/inactivarTarea/{id}")
    public ResponseEntity<String> inactivarTarea(@PathVariable Long id) {
        String response = tareaService.inactivarTarea(id);
        return ResponseEntity.ok(response);
    }
}
