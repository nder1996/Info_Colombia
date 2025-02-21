package FullStack.InformaColombia.domain.repository;


import FullStack.InformaColombia.domain.model.EstadoTarea;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SummaryRepository {

    @Select("SELECT * FROM ESTADOS_TAREA")
    List<EstadoTarea> findAll();

    @Select("SELECT * FROM ESTADOS_TAREA WHERE id = #{id}")
    EstadoTarea findById( @Param("id") Integer id);

}
