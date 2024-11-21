package pe.muselock.demongfile.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login", "/error").permitAll() 
                .anyRequest().authenticated()                        
            )
            .oauth2Login(oauth2 -> oauth2                            
                .loginPage("/login")                        
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")         
                .permitAll()
            );
        return http.build();
    }
}