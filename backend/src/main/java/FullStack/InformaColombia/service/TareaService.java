package FullStack.InformaColombia.service;

import FullStack.InformaColombia.dto.request.TareaRequest;
import FullStack.InformaColombia.dto.response.TareasResponse;
import FullStack.InformaColombia.entity.Tarea;
import FullStack.InformaColombia.entity.Usuario;
import FullStack.InformaColombia.repository.TareaRepository;
import FullStack.InformaColombia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class TareaService {

    @Autowired
    TareaRepository tareaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

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

    public List<TareasResponse> tareasXUsuario(String username) {
        try {
            List<Map<String, Object>> roles = getRolesXUsuario(username);
            for(Map<String, Object> rol : roles) {
                Integer idRol = (Integer) rol.get("idRol");
                if(1==idRol) {
                    return getAllTareas();
                }
            }
            List<TareasResponse> tareas = this.tareaRepository.tareasXUsuario(username);
            if(tareas != null && !tareas.isEmpty()) {
                return tareas;
            } else {
                return List.of();
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return List.of();
        }
    }

    public String createTarea(TareaRequest task){
        String mensaje = "";
        Usuario  user = new Usuario();
        try {
            Tarea tarea = new Tarea();
            tarea.setTitulo(task.getTitulo());
            tarea.setDescripcion(task.getDescripcion());
            tarea.setCreateAt(new Date());
            tarea.setVencimientoTarea(task.getVencimientoTarea());
            tarea.setIdEstadoTarea(task.getIdEstadoTarea());
            user = byUserXEmail(task.getIdUsuario());
            tarea.setIdUsuario(user.getId());
            tarea.setEstado("A");
            Integer row = this.tareaRepository.insertTareas(tarea);
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

    public String updateTarea(TareaRequest task){
        String mensaje = "";
        Usuario user;
        try {
            Tarea tarea = new Tarea();
            tarea.setId(task.getId());
            tarea.setTitulo(task.getTitulo());
            tarea.setDescripcion(task.getDescripcion());
            tarea.setCreateAt(new Date());
            tarea.setVencimientoTarea(task.getVencimientoTarea());
            tarea.setIdEstadoTarea(task.getIdEstadoTarea());
            user = byUserXEmail(task.getIdUsuario());
            tarea.setIdUsuario(user.getId());
            tarea.setEstado("A");
            Integer row = this.tareaRepository.updateTareas(tarea);
            if(row!=null && row>0){
                return "Tarea actualizada exitosamente";
            }
        }catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            mensaje = "internal server error";
        }
        return "Hubo un error al actualizar la tarea";
    }



    public String inactivarTarea(Long id) {
        try {
            this.tareaRepository.inactivarTarea(id);
            return "Tarea inactivada exitosamente";
        } catch (Exception e) {
            //log.error("Error inactivando tarea: " + e.getMessage());
            return "Error al inactivar tarea";
        }
    }




    public Usuario byUserXEmail(String email) throws UsernameNotFoundException {
        return usuarioRepository.ByUser(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
    }

    public List<Map<String, Object>> getRolesXUsuario(String email) {
        return this.usuarioRepository.rolesXUsuario(email);
    }


}
