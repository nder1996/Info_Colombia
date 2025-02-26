package FullStack.InformaColombia.application.service;


import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.domain.model.EstadoTarea;
import FullStack.InformaColombia.domain.repository.SummaryRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SummaryService {

    private static final Logger logger = LoggerFactory.getLogger(SummaryService .class);

    @Autowired
    private SummaryRepository repository;



    public ApiResponse<List<EstadoTarea>> getAllData() {
        try {
            List<EstadoTarea> results = repository.findAll();
            if(results != null && !results.isEmpty()) {
                return ResponseApiBuilderService.successResponse(results, "ESTADOS_ENCONTRADOS", 200);
            }
            return ResponseApiBuilderService.successResponse(null, "NO_ESTADOS_ENCONTRADOS", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_ESTADOS", "Error al obtener estados");
        }
    }

    public ApiResponse<List<EstadoTarea>> getAllRol() {
        try {
            List<EstadoTarea> results = repository.findAllRol();
            if(results != null && !results.isEmpty()) {
                return ResponseApiBuilderService.successResponse(results, "ROLES_ENCONTRADOS", 200);
            }
            return ResponseApiBuilderService.successResponse(null, "ROLES_ESTADOS_ENCONTRADOS", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_ROLES", "Error al obtener roles");
        }
    }

    public ApiResponse<EstadoTarea> getByIdData(Integer id) {
        try {
            EstadoTarea result = repository.findById(id);
            if(result != null) {
                return ResponseApiBuilderService.successResponse(result, "ESTADO_ENCONTRADO", 200);
            }
            return ResponseApiBuilderService.successResponse(null, "ESTADO_NO_ENCONTRADO", 204);
        } catch (Exception e) {
            return ResponseApiBuilderService.errorResponse(500, "ERROR_ESTADO", "Error al obtener estado");
        }
    }



}
