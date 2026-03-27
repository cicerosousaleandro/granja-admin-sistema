package com.granja.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    // Usuário master hardcoded
    private static final String USUARIO_MASTER = "supervisor";
    private static final String SENHA_MASTER = "login@321564";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Verifica credenciais
        if (USUARIO_MASTER.equals(request.getUsername()) &&
                SENHA_MASTER.equals(request.getPassword())) {

            Map<String, Object> response = new HashMap<>();
            response.put("logado", true);
            response.put("usuario", request.getUsername());
            response.put("token", "token-fake-" + System.currentTimeMillis());
            response.put("mensagem", "Login realizado com sucesso!");

            return ResponseEntity.ok(response);
        }

        Map<String, Object> error = new HashMap<>();
        error.put("logado", false);
        error.put("mensagem", "Usuário ou senha inválidos");

        return ResponseEntity.status(401).body(error);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<?> criarUsuario(@RequestBody Map<String, String> request) {
        // Simplificado - só retorna ok para demonstração
        Map<String, Object> response = new HashMap<>();
        response.put("mensagem", "Usuário criado com sucesso (demo)");
        response.put("usuario", request.get("username"));

        return ResponseEntity.ok(response);
    }

    // Classe interna para receber o login
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}