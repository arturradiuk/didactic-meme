package org.wzas.didacticmeme.repository;

import com.google.common.hash.Hashing;
import org.springframework.stereotype.Component;
import org.wzas.didacticmeme.model.AccessLevel;
import org.wzas.didacticmeme.model.MessageEnt;
import org.wzas.didacticmeme.model.UserEnt;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class InMemoryRepository {
    private List<UserEnt> userEnts;
    private List<MessageEnt> messageEnts;

    public InMemoryRepository() {
        userEnts = new ArrayList<>();
        messageEnts = new ArrayList<>();

        userEnts.add(new UserEnt(0L, "tola@gmail.com", "123456", "tola", AccessLevel.ROLE_USER, null));
        userEnts.add(new UserEnt(1L, "bob@gmail.com", "123456", "bob", AccessLevel.ROLE_USER, null));

        messageEnts.add(new MessageEnt(0L, UUID.randomUUID(), userEnts.get(1), userEnts.get(0), "Hello Tola", LocalDateTime.now(), true));
        messageEnts.add(new MessageEnt(1L, UUID.randomUUID(), userEnts.get(0), userEnts.get(1), "Hello Bob", LocalDateTime.now(), true));
    }

    public List<MessageEnt> getAllSentMessagesForTheEmail(String email) {
//        this.messageEnts = this.messageEnts.stream().map(messageEnt -> {
//            messageEnt.setRead(null);
//            return messageEnt;
//        }).collect(Collectors.toList());
        return this.messageEnts.stream().filter(messageEnt -> messageEnt.getSender().getEmail().equals(email)).map(messageEnt -> {
            messageEnt.setRead(null);
            return messageEnt;
        })
                .collect(Collectors.toList());
    }

    public List<MessageEnt> getAllReceivedMessagesForTheEmail(String email) {
        return this.messageEnts.stream().filter(messageEnt -> messageEnt.getReceiver().getEmail().equals(email)).collect(Collectors.toList());
    }

    public UserEnt findUserByEmail(String email) {
        return this.userEnts.stream().filter(userEnt -> userEnt.getEmail().equals(email)).findAny().get();
    }

    public void addUser(UserEnt userEnt) {
        this.userEnts.add(userEnt);
    }

    public void createNewMessage(MessageEnt messageEnt) {
        Optional<UserEnt> sender = this.userEnts.stream().filter(userEnt -> userEnt.getEmail().equals(messageEnt.getSender().getEmail())).findAny();
        Optional<UserEnt> receiver = this.userEnts.stream().filter(userEnt -> userEnt.getEmail().equals(messageEnt.getReceiver().getEmail())).findAny();

        messageEnt.setUuid(UUID.randomUUID());
        try {

            messageEnt.setSender(sender.orElseThrow(() -> new Exception()));
            messageEnt.setReceiver(receiver.orElseThrow(() -> new Exception()));
            messageEnt.setRead(false);
        } catch (Exception exception) {
            //todo
        }

        this.messageEnts.add(messageEnt);
    }

    public void changeStatusToTheMessage(String messageId, String login) {
        UUID messageUuid = UUID.fromString(messageId);
        this.messageEnts = this.messageEnts.stream().map(messageEnt -> {
            if (messageEnt.getUuid().equals(messageUuid) && messageEnt.getReceiver().getEmail().equals(login)) {
                messageEnt.setRead(true);
                return messageEnt;
            }
            return messageEnt;

        }).collect(Collectors.toList());

    }

    public Optional<UserEnt> getUserByEmailAndPassword(String email, String password) {
        String sha256hex = Hashing.sha256()
                .hashString("hello world", StandardCharsets.UTF_8)
                .toString();
        return this.userEnts.stream().filter(userEnt -> userEnt.getEmail().equals(email) && userEnt.getPassword().equals(password)).findAny();
    }

    public Optional<UserEnt> getUserByEmail(String email) {
        return this.userEnts.stream().filter(userEnt -> userEnt.getEmail().equals(email)).findAny();
    }

}
