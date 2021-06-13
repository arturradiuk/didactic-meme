package org.wzas.didacticmeme.web.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wzas.didacticmeme.dto.SendMessageDto;
import org.wzas.didacticmeme.model.MessageEnt;
import org.wzas.didacticmeme.service.MessageService;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/exchanged/_self/{user-name}")
    public ResponseEntity<List<MessageEnt>> getExchangedMessages(Principal principal, @PathVariable("user-name") String userName) {
        List<MessageEnt> messages = messageService.findAllExchangedMessages(principal.getName(), userName);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/received/_self")
    public ResponseEntity<List<MessageEnt>> getAllReceivedMessages(Principal principal) {
        final List<MessageEnt> messageEnts = this.messageService.findAllReceivedMessagesForTheEmail(principal.getName());
        return ResponseEntity.ok(messageEnts);
    }

    @GetMapping("/received/_self/{user-name}")
    public ResponseEntity<List<MessageEnt>> getReceivedMessagesFromUser(Principal principal, @PathVariable("user-name") String userName) {
        List<MessageEnt> messages = messageService.findAllReceivedMessagesForTheEmail(principal.getName()).stream()
                .filter(messageEnt -> messageEnt.getSender().getUserName().equals(userName))
                .collect(Collectors.toList());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/sent/_self")
    public ResponseEntity<List<MessageEnt>> getAllSentMessages(Principal principal) {
        final List<MessageEnt> messageEnts = this.messageService.findAllSentMessagesForTheEmail(principal.getName());
        return ResponseEntity.ok(messageEnts);
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendNewMessage(@RequestBody SendMessageDto message, Principal principal) {
        this.messageService.sendNewMessage(principal.getName(), message.getReceiver(), message.getContent());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read/{messageId}")
    public ResponseEntity<Void> updateMessageStatusToRead(@PathVariable String messageId, Principal principal) {
        this.messageService.updateMessageReadStatus(messageId, principal.getName());
        return ResponseEntity.ok().build();
    }


}
