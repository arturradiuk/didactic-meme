package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wzas.didacticmeme.dto.ChatNameDto;
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

    @PutMapping("/_self/profile/editEmail/{newEmail}")
    public UserEnt changeEmail(Principal principal, @PathVariable("newEmail") String newEmail) {
        return userService.changeEmail(principal.getName(), newEmail);
    }

    @GetMapping("/chat-avatar/{login}")
    public ResponseEntity<String> getUserAvatar(@PathVariable("login") String name) {
        String userAvatar = userService.findUserByName(name).getAvatar();
        return ResponseEntity.ok(userAvatar);
    }

    @GetMapping("/chat-avatar/chat-avatars")
    public ResponseEntity<List<ChatNameDto>> getAllChatNames() {
        List<ChatNameDto> allUsernames = userService.getAllChatAvatars();
        return ResponseEntity.ok(allUsernames);
    }
}
