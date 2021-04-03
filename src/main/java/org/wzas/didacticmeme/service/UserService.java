package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.model.auth.AuthRequest;
import org.wzas.didacticmeme.repository.UserRepository;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveNewUser(UserEnt userEnt) {
        this.userRepository.save(userEnt);
    }

    public UserEnt findUser(AuthRequest request) {
        return this.userRepository.findByEmailAndPassword(request.getLogin(), request.getPassword()).get(); // todo
    }

    public UserEnt findUserByEmail(String email) {
        return this.userRepository.findByEmail(email).get();
    }
}
