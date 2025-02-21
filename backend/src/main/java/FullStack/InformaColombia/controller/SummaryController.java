package FullStack.InformaColombia.controller;

import FullStack.InformaColombia.entity.EstadoTarea;
import FullStack.InformaColombia.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/summary/")
public class SummaryController<T> {

    @Autowired
    private SummaryService<T> service;


    @GetMapping("getAllData")
    public ResponseEntity<List<EstadoTarea>> getAllData() {
        List<EstadoTarea> data = service.getAllData();
        return data != null ?
                ResponseEntity.ok(data) :
                ResponseEntity.noContent().build();
    }

    @GetMapping("getByData/{id}")
    public ResponseEntity<EstadoTarea> getByData(
            @PathVariable Integer id) {
        EstadoTarea data = service.getByIdData(id);
        return data != null ?
                ResponseEntity.ok(data) :
                ResponseEntity.notFound().build();
    }


}
