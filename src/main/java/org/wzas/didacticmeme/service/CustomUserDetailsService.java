package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.config.CustomUserDetails;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.repository.InMemoryRepository;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private InMemoryRepository inMemoryRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEnt> user = inMemoryRepository.getUserByEmail(username);
        return CustomUserDetails.fromUserEntToCustomUserDetails(user.orElseThrow(() -> new UsernameNotFoundException("there is no user with such email")));
    }
}
