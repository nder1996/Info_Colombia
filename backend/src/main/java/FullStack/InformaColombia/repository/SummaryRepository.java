package FullStack.InformaColombia.repository;


import FullStack.InformaColombia.entity.EstadoTarea;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SummaryRepository<T> {

    @Select("SELECT * FROM ESTADOS_TAREA")
    List<EstadoTarea> findAll();

    @Select("SELECT * FROM ESTADOS_TAREA WHERE id = #{id}")
    EstadoTarea findById( @Param("id") Integer id);

}
