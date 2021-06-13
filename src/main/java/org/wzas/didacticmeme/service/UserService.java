package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.model.auth.AuthRequest;
import org.wzas.didacticmeme.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveNewUser(UserEnt userEnt) {
        this.userRepository.save(userEnt);
    }

    public UserEnt findUser(AuthRequest request) {
        return this.userRepository.findByLoginAndPassword(request.getLogin(), request.getPassword()).get(); // todo
    }

    public UserEnt findUserByEmail(String email) {
        return this.userRepository.findByEmail(email).get();
    }

    public UserEnt findUserByName(String name) {
        return this.userRepository.findByUserName(name).get();
    }

    public UserEnt changeName(String name) {
        return this.userRepository.;
    }

    public List<String> getAllOtherUsernames(String currentUserEmail) {
        UserEnt currentUser = userRepository.findByEmail(currentUserEmail).get();
        return userRepository.findAll().stream()
                .map(UserEnt::getUserName)
                .filter(userName -> !userName.equals(currentUser.getUserName()))
                .collect(Collectors.toList());
    }

}
