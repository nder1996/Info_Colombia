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
    public ResponseEntity<List<TareasResponse>> test() {
        List<TareasResponse> responses = this.tareaService.getAllTareas();
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/createTarea")
    public ResponseEntity<String> createTarea(@RequestBody TareaRequest task) {
        String responses = this.tareaService.createTarea(task);
        return ResponseEntity.ok(responses);
    }
}
