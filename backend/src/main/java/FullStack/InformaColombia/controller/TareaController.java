package FullStack.InformaColombia.controller;

import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
