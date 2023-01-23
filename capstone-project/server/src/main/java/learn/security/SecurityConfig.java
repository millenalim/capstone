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
                //TODO: Secure create_profile and have create_account return a JWT
                .antMatchers(HttpMethod.POST,"/user").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.GET,
                        "/").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/user/*").permitAll()
                .antMatchers(HttpMethod.GET,"/users").permitAll()

                .antMatchers(HttpMethod.PUT, "/create_profile/*").hasAnyAuthority("USER", "ADMIN")
//                .antMatchers(HttpMethod.POST,
//                        "/sighting").hasAnyAuthority("USER", "ADMIN")

                .antMatchers(HttpMethod.GET,
                        "/discover").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.PUT, "/create_profile").hasAnyAuthority("USER", "ADMIN")

//                .antMatchers(HttpMethod.PUT,
//                        "/sighting/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/user/*").hasAnyAuthority("ADMIN", "USER")

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