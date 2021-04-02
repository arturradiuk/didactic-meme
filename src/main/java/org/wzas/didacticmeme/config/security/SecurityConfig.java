package org.wzas.didacticmeme.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.wzas.didacticmeme.config.security.jwt.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtFilter jwtFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .antMatchers("/testendpoint").permitAll()

                .antMatchers("/api/auth/**").permitAll()

                .antMatchers("/api/users/_self").hasRole("USER")

                .antMatchers("/api/messages/received/_self").hasRole("USER")
                .antMatchers("/api/messages/sent/_self").hasRole("USER")


                .antMatchers("/api/messages/send").hasRole("USER")
                .antMatchers("/api/messages/read/*").hasRole("USER")

                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }



}
