package learn.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {

        http.csrf().disable();


        http.cors();


        http.authorizeRequests()
                // new...
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers("/create_account").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/order").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/sighting", "/sighting/*").permitAll()
                .antMatchers(HttpMethod.POST,
                        "/sighting").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/sighting/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/sighting/*").hasAnyAuthority("ADMIN")

                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}