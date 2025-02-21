package FullStack.InformaColombia.service;

import FullStack.InformaColombia.entity.EstadoTarea;
import FullStack.InformaColombia.repository.SummaryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SummaryService<T> {

    @Autowired
    private SummaryRepository<T> repository;

    public List<EstadoTarea> getAllData() {
        try {
            List<EstadoTarea> results = repository.findAll();
            if(results!=null && !results.isEmpty()){
                return results;
            }else{
                return null;
            }
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }

    public EstadoTarea getByIdData(Integer id) {
        try {
            EstadoTarea result = repository.findById(id);
            if(result!=null){
                return result;
            }else{
                return null;
            }
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }

}
