package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.config.security.CustomUserDetails;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.repository.InMemoryRepository;
import org.wzas.didacticmeme.repository.UserRepository;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    //    @Autowired
//    private InMemoryRepository inMemoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<UserEnt> user = inMemoryRepository.getUserByEmail(username);
        Optional<UserEnt> user = userRepository.findByUserName(username);
        return CustomUserDetails.fromUserEntToCustomUserDetails(user.orElseThrow(() -> new UsernameNotFoundException("there is no user with such username")));
    }
}
