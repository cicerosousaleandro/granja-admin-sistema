package com.granja.admin;

import com.granja.admin.model.Usuario;
import com.granja.admin.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GranjaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GranjaBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Se não houver nenhum usuário, cria o admin
            if (repository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setNome("Administrador");
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                admin.setAtivo(true);
                repository.save(admin);
                System.out.println(">>> USUÁRIO ADMIN CRIADO: admin / admin123");
            }
        };
    }
}
