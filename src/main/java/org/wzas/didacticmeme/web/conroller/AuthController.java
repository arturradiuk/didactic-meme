package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wzas.didacticmeme.config.security.jwt.JwtProvider;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.model.auth.AuthRequest;
import org.wzas.didacticmeme.model.auth.RegistrationRequest;
import org.wzas.didacticmeme.service.UserService;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

//    @Autowired
//    private InMemoryRepository repository;

    private final UserService userService;

    private final JwtProvider jwtProvider;

    @Autowired
    public AuthController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<UserEnt> registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        UserEnt userEnt = new UserEnt(); // todo move to service ???
        userEnt.setUserName(registrationRequest.getUserName());
        userEnt.setEmail(registrationRequest.getEmail());
        userEnt.setPassword(registrationRequest.getPassword());

//        repository.addUser(userEnt);
        userService.saveNewUser(userEnt);

        return new ResponseEntity<>(userEnt, HttpStatus.OK);
//        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid AuthRequest request) {
        try {
//        UserEnt user = repository.getUserByEmailAndPassword(request.getLogin(), request.getPassword()).get();
//        UserEnt user = userRepository.findByEmailAndPassword(request.getLogin(), request.getPassword()).get(); //todo get
            UserEnt user = userService.findUser(request); //todo get
            String token = jwtProvider.generateToken(user.getEmail());
            return ResponseEntity.accepted().body(token);
        } catch (Exception e) {
            return new ResponseEntity<>("No valid credentials found", HttpStatus.NOT_FOUND);
        }
    }
}
