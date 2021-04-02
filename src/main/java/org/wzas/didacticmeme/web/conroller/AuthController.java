package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wzas.didacticmeme.config.security.jwt.JwtProvider;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.model.auth.AuthRequest;
import org.wzas.didacticmeme.model.auth.RegistrationRequest;
import org.wzas.didacticmeme.repository.InMemoryRepository;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private InMemoryRepository repository;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        UserEnt userEnt = new UserEnt();
        userEnt.setUserName(registrationRequest.getUserName());
        userEnt.setEmail(registrationRequest.getLogin());
        userEnt.setPassword(registrationRequest.getPassword());
        repository.addUser(userEnt);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid AuthRequest request) {
        UserEnt user = repository.getUserByEmailAndPassword(request.getLogin(), request.getPassword()).get();
        String token = jwtProvider.generateToken(user.getEmail());
        return ResponseEntity.accepted().body(token);
    }


}
