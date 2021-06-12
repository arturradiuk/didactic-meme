package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wzas.didacticmeme.model.MessageEnt;
import org.wzas.didacticmeme.repository.InMemoryRepository;
import org.wzas.didacticmeme.service.MessageService;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
//    @Autowired
//    private InMemoryRepository repository;

    @Autowired
    private MessageService messageService;

    @GetMapping("/received/_self")
    public ResponseEntity<List<MessageEnt>> getAllReceivedMessages(Principal principal) {
//        final List<MessageEnt> messageEnts = this.repository.getAllReceivedMessagesForTheEmail(principal.getName());
        final List<MessageEnt> messageEnts = this.messageService.findAllReceivedMessagesForTheEmail(principal.getName());
        return ResponseEntity.ok().body(messageEnts);
    }

    @GetMapping("/sent/_self")
    public ResponseEntity<List<MessageEnt>> getAllSentMessages(Principal principal) {
//        final List<MessageEnt> messageEnts = this.repository.getAllSentMessagesForTheEmail(principal.getName());
        final List<MessageEnt> messageEnts = this.messageService.findAllSentMessagesForTheEmail(principal.getName());
        return ResponseEntity.ok().body(messageEnts);
    }

    @PostMapping("/send")
    public ResponseEntity sendNewMessage(@RequestBody MessageEnt messageEnt, Principal principal) {
        if (!messageEnt.getSender().getEmail().equals(principal.getName())) { // in case someone will be cheating
            return ResponseEntity.status(403).build();
        }
        this.messageService.sendNewMessage(messageEnt);
//        this.repository.createNewMessage(messageEnt);
//        this.repository.createNewMessage(messageEnt);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read/{messageId}")
    public ResponseEntity updateMessageStatusToRead(@PathVariable String messageId, Principal principal) {
//        this.repository.changeStatusToTheMessage(messageId, principal.getName());
        this.messageService.updateMessageReadStatus(messageId, principal.getName());
        return ResponseEntity.ok().build();
    }


}
