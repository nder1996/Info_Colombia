package FullStack.InformaColombia.application.service;


import FullStack.InformaColombia.application.dto.response.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public class ResponseApiBuilderService {

    public static <T> ApiResponse<T> successResponse(T data, String key, Integer status) {
        ApiResponse<T> response = new ApiResponse<>();
        try {
            response.setMeta(new ApiResponse.Meta("Operación Exitosa", status));
            response.setData(data);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
        return response;
    }

    public static <T> ApiResponse<T> errorResponse(Integer codeHttp, String codeName, String codeDescription) {
        ApiResponse<T> response = new ApiResponse<>();
        try {
            response.setData(null);
            response.setMeta(new ApiResponse.Meta("Solicitud Incorrecta", codeHttp));
            response.setError(new ApiResponse.ErrorDetails(codeName, codeDescription));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
        return response;
    }
}
