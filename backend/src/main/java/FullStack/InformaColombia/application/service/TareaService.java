package FullStack.InformaColombia.application.service;


import FullStack.InformaColombia.application.dto.request.TareaRequest;
import FullStack.InformaColombia.application.dto.response.ApiResponse;
import FullStack.InformaColombia.application.dto.response.TareasResponse;
import FullStack.InformaColombia.domain.model.Tarea;
import FullStack.InformaColombia.domain.model.Usuario;
import FullStack.InformaColombia.domain.repository.TareaRepository;
import FullStack.InformaColombia.domain.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(TareaService.class);


    public ApiResponse<List<TareasResponse>> getAllTareas(){
        logger.info("🔍 Iniciando búsqueda de todas las tareas");
        try {
            List<TareasResponse> tareas = this.tareaRepository.getAllTareas();
            if(tareas!=null && !tareas.isEmpty()){
                logger.info("✅ Se encontraron {} tareas", tareas.size());
                return ResponseApiBuilderService.successResponse(tareas, "TAREAS_ACTIVAR",200);
            }

        }catch (Exception e) {
            e.getStackTrace();
            logger.error("❌ Error al obtener las tareas: {}", e.getMessage(), e);
            ResponseApiBuilderService.errorResponse(500,"ERROR_SERVER","INTERNAL_SERVER_ERROR");
        }
        logger.warn("⚠️ No se encontraron tareas en la base de datos");
        return ResponseApiBuilderService.successResponse(null, "TAREAS_NO_ENCONTRADAS",204);
    }

    public ApiResponse<List<TareasResponse>> tareasXUsuario(String username) {
        try {
            List<Map<String, Object>> roles = getRolesXUsuario(username);
            for(Map<String, Object> rol : roles) {
                Integer idRol = (Integer) rol.get("idRol");
                if(1==idRol) {
                    return getAllTareas();
                }
            }
            logger.info("🔍 Iniciando búsqueda de todas las tareas filtradas por usuario = {}", username);
            List<TareasResponse> tareas = this.tareaRepository.tareasXUsuario(username);
            if(tareas != null && !tareas.isEmpty()) {
                logger.info("✅ Se encontraron {} tareas filtradas por usuario = {}", tareas.size() , username);
                return ResponseApiBuilderService.successResponse(tareas, "TAREAS_ACTIVAR",200);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("❌ Error al obtener las tareas filtradas por usuario = {} error {}", username,e.getMessage());
            ResponseApiBuilderService.errorResponse(500,"ERROR_SERVER","INTERNAL_SERVER_ERROR");
        }
        logger.warn("⚠️ No se encontraron tareas relacionados con el usuario = {} ",username);
        return ResponseApiBuilderService.successResponse(null, "TAREAS_NO_ENCONTRADAS",204);
    }

    public ApiResponse<String> createTarea(TareaRequest task){
        logger.info("📝 Iniciando creación de tarea: {}", task.getTitulo());
        try {
            Tarea tarea = new Tarea();
            Usuario user = new Usuario();

            user = byUserXEmail(task.getUsername());
            logger.debug("👤 Usuario encontrado: {}", user.getEmail());

            tarea.setTitulo(task.getTitulo());
            tarea.setDescripcion(task.getDescripcion());
            tarea.setCreateAt(new Date());
            tarea.setVencimientoTarea(task.getVencimientoTarea());
            tarea.setIdEstadoTarea(task.getIdEstadoTarea());
            tarea.setIdUsuario(user.getId());
            tarea.setEstado("A");

            logger.debug("🔧 Tarea preparada para inserción");
            Integer row = this.tareaRepository.insertTareas(tarea);
            if(row!=null && row>0){
                logger.info("✅ Tarea creada exitosamente con ID");
                return ResponseApiBuilderService.successResponse("Tarea creada exitosamente", "TAREA_CREADA",200);
            }
        }catch (Exception e) {
            e.getStackTrace();
            logger.error("❌ Error al crear la tarea: {}", e.getMessage(), e);
            ResponseApiBuilderService.errorResponse(500,"ERROR_SERVER","INTERNAL_SERVER_ERROR");
        }
        logger.warn("⚠️ No se pudo crear la tarea");
        return ResponseApiBuilderService.successResponse("HUBO UN ERROR AL CREAR LA TAREA", "ERROR_CREAR_TAREA",400);
    }

    public ApiResponse<String> updateTarea(TareaRequest task) {
        logger.info("🔄 Iniciando actualización de tarea ID: {}", task.getId());
        try {
            Usuario user = byUserXEmail(task.getUsername());
            logger.debug("👤 Usuario verificado: {}", user.getId());

            Tarea tarea = new Tarea();
            tarea.setId(task.getId());
            tarea.setTitulo(task.getTitulo());
            tarea.setDescripcion(task.getDescripcion());
            tarea.setCreateAt(new Date());
            tarea.setVencimientoTarea(task.getVencimientoTarea());
            tarea.setIdEstadoTarea(task.getIdEstadoTarea());
            tarea.setIdUsuario(user.getId());
            tarea.setEstado("A");

            logger.debug("📋 Datos de tarea preparados para actualización");
            Integer row = this.tareaRepository.updateTareas(tarea);

            if(row != null && row > 0) {
                logger.info("✅ Tarea actualizada exitosamente");
                return ResponseApiBuilderService.successResponse("Tarea actualizada exitosamente", "TAREA_ACTUALIZADA",200);
            }

            logger.warn("⚠️ No se pudo actualizar la tarea");
            return ResponseApiBuilderService.successResponse("No se pudo actualizar la tarea", "HUBO_UN_ERROR",400);


        } catch (Exception e) {
            logger.error("❌ Error al actualizar tarea: {}", e.getMessage(), e);
            e.getStackTrace();
            return ResponseApiBuilderService.errorResponse(500,"ERROR_SERVER","INTERNAL_SERVER_ERROR");
        }
    }


    public ApiResponse<String> inactivarTarea(Long id) {
        logger.info("🔵 Iniciando eliminada de tarea ID: {}", id);
        try {
            this.tareaRepository.inactivarTarea(id);
            logger.info("✅ Tarea {} eliminada exitosamente", id);
            return ResponseApiBuilderService.successResponse("Tarea eliminada con éxito", "TAREA_ELIMINADA",200);
        } catch (Exception e) {
            logger.error("❌ Error al eliminada tarea {}: {}", id, e.getMessage(), e);
            e.getStackTrace();
            return ResponseApiBuilderService.errorResponse(500,"ERROR_SERVER","INTERNAL_SERVER_ERROR");

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
