package FullStack.InformaColombia.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ApiResponse<T> {

    private Meta meta;
    private T data;
    private ErrorDetails error;

    public ApiResponse() {
    }

    public ApiResponse(Meta meta, T data, ErrorDetails error) {
        this.meta = meta;
        this.data = data;
        this.error = error;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public ErrorDetails getError() {
        return error;
    }

    public void setError(ErrorDetails error) {
        this.error = error;
    }

    public static class Meta {
        private String message;
        private Integer statusCode;

        public Meta() {
        }

        public Meta(String message, Integer statusCode) {
            this.message = message;
            this.statusCode = statusCode;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Integer getStatusCode() {
            return statusCode;
        }

        public void setStatusCode(Integer statusCode) {
            this.statusCode = statusCode;
        }
    }

    public static class ErrorDetails {
        private String code;
        private String description;

        public ErrorDetails() {
        }

        public ErrorDetails(String code, String description) {
            this.code = code;
            this.description = description;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
