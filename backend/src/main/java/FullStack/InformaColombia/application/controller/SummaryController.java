package FullStack.InformaColombia.application.controller;

import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.service.SummaryService;
import FullStack.InformaColombia.domain.model.EstadoTarea;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/summary/")
public class SummaryController {

    @Autowired
    private SummaryService summaryService;


    @GetMapping("getAllData")
    public ResponseEntity<ApiResponse<List<EstadoTarea>>> getAllData() {
        ApiResponse<List<EstadoTarea>> response = this.summaryService.getAllData();
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }

    @GetMapping("getByData/{id}")
    public ResponseEntity<ApiResponse<EstadoTarea>> getByData(
            @Valid  @PathVariable Integer id) {
        ApiResponse<EstadoTarea> response = this.summaryService.getByIdData(id);
        return ResponseEntity.status(response.getMeta().getStatusCode()).body(response);
    }
}
