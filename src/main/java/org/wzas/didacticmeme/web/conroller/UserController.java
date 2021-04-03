package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.repository.InMemoryRepository;
import org.wzas.didacticmeme.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {
    //    @Autowired
//    private InMemoryRepository repository;
    @Autowired
    private UserService userService;

    @GetMapping("/_self")
    public ResponseEntity<UserEnt> getReceivedMessages(Principal principal) {
//        final UserEnt userEnt = repository.findUserByEmail(principal.getName());
        final UserEnt userEnt = userService.findUserByEmail(principal.getName());
        return ResponseEntity.ok().body(userEnt);
    }
}
