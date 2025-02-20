package FullStack.InformaColombia.service;

import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {

    @Autowired
    TareaRepository tareaRepository;

    public List<TareasResponse> getAllTareas(){
        String mensaje = "";
        try {
            List<TareasResponse> tareas = this.tareaRepository.getAllTareas();
            if(tareas!=null && !tareas.isEmpty()){
                return tareas;
            }
            return null;
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
            mensaje = "internal server error";
        }
        return List.of();
    }


}
