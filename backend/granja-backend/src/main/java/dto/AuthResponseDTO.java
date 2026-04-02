package com.granja.admin.dto;

public class AuthResponseDTO {

    private String token;
    private String username;
    private String role;
    private String nome;
    private String mensagem;



    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
}