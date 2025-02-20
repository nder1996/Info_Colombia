package FullStack.InformaColombia.Config.Security.Jwt.dto;

import java.io.Serializable;

public class JwtResponse {

    private String token;
    private String type = "Bearer";

    public JwtResponse(String token) {
        this.token = token;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }
}
