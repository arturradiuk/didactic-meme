package org.wzas.didacticmeme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.model.MessageEnt;
import org.wzas.didacticmeme.model.UserEnt;
import org.wzas.didacticmeme.repository.MessageRepository;
import org.wzas.didacticmeme.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
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

    public List<MessageEnt> findAllExchangedMessages(String currentUserEmail, String userName) {
        UserEnt currentUser = userRepository.findByEmail(currentUserEmail).get();

        List<MessageEnt> messages = messageRepository.findAllByReceiver_UserNameAndSender_UserName(currentUser.getUserName(), userName);
        messages.addAll(messageRepository.findAllBySender_UserNameAndReceiver_UserName(currentUser.getUserName(), userName));
        return messages;
    }

    public void sendNewMessage(String userEmail, String receiverName, String content) {
        UserEnt sender = userRepository.findByEmail(userEmail).get();
        UserEnt receiver = userRepository.findByUserName(receiverName).get();
        MessageEnt messageEnt = new MessageEnt(sender, receiver, content, LocalDateTime.now());
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
