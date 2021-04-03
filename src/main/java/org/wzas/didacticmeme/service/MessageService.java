package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.model.MessageEnt;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.repository.MessageRepository;
import org.wzas.didacticmeme.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class MessageService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    public List<MessageEnt> findAllSentMessagesForTheEmail(String email) {
        UserEnt user = userRepository.findByEmail(email).get();
        return messageRepository.findAllBySenderId(user.getId()).stream().map(messageEnt -> { // to hide read status
            messageEnt.setRead(null);
            return messageEnt;
        }).collect(Collectors.toList());
    }

    public List<MessageEnt> findAllReceivedMessagesForTheEmail(String email) {
        UserEnt user = userRepository.findByEmail(email).get();
        return messageRepository.findAllByReceiverId(user.getId());
    }

    public void sendNewMessage(MessageEnt messageEnt) {
        UserEnt sender = userRepository.findByEmail(messageEnt.getSender().getEmail()).get(); // todo
        UserEnt receiver = userRepository.findByEmail(messageEnt.getReceiver().getEmail()).get(); // todo
        messageEnt.setSender(sender);
        messageEnt.setReceiver(receiver);
        messageEnt.setUuid(UUID.randomUUID()); // todo add jpa unique constraint
        messageEnt.setRead(false); // todo create dto and remove this field
        messageRepository.save(messageEnt);
    }

    public void updateMessageReadStatus(String messageId, String email) {
        UUID messageUuid = UUID.fromString(messageId);
        MessageEnt messageEnt = this.messageRepository.findDistinctFirstByUuid(messageUuid).get();//todo
        if (messageEnt.getReceiver().getEmail().equals(email)) {
            messageEnt.setRead(true);
            this.messageRepository.save(messageEnt);
        } else {
            //todo
        }
    }
}
