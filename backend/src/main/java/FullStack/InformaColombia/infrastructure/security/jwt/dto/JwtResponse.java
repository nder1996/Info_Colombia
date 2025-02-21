package FullStack.InformaColombia.infrastructure.security.jwt.dto;

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
