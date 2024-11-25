package pe.muselock.demongfile.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {

  @Bean
  ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public WebMvcConfigurer mvcConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("media/**")
            .allowedOrigins("*")
            .allowedMethods("*");
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
      }
    };
  }
}
