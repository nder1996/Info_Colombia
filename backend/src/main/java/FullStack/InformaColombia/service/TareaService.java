package FullStack.InformaColombia.service;

import FullStack.InformaColombia.dto.request.TareaRequest;
import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.entity.Tarea;
import FullStack.InformaColombia.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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

    public String createTarea(TareaRequest task){
        String mensaje = "";
        try {
            Tarea tarea = new Tarea();
            tarea.setTitulo(task.getTitulo());
            tarea.setDescripcion(task.getDescripcion());
            tarea.setCreateAt(new Date());
            tarea.setVencimientoTarea(task.getVencimientoTarea());
            tarea.setIdEstadoTarea(task.getIdEstadoTarea());
            tarea.setIdUsuario(task.getIdUsuario());
            tarea.setEstado("A");
            Integer row = this.tareaRepository.insertTask(tarea);
            if(row!=null && row>0){
                return "Tarea creada exitosamente";
            }
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
            mensaje = "internal server error";
        }
        return "Hubo un error al crear la tarea";
    }


}
