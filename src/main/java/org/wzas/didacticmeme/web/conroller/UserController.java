package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.service.UserService;

import java.security.Principal;
import java.util.List;

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

    @GetMapping("/_self/chat-names")
    public ResponseEntity<List<String>> getAllUserNamesList(Principal principal) {
        List<String> allUsernames = userService.getAllOtherUsernames(principal.getName());
        return ResponseEntity.ok(allUsernames);
    }

    @GetMapping("/_self/profile")
    public ResponseEntity<UserEnt> getUserData(Principal principal) {
        UserEnt userData = userService.findUserByName(principal.getName());
        return ResponseEntity.ok(userData);
    }

    @GetMapping("/_self/profile/editName")
    public UserEnt chengeUserName(Principal principal) {
        return userService.se

}
