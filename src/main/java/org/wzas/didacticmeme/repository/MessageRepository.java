package org.wzas.didacticmeme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.wzas.didacticmeme.model.MessageEnt;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface MessageRepository extends JpaRepository<MessageEnt, Long> {
    @Query("FROM messages WHERE sender.id = :id")
    List<MessageEnt> findAllBySenderId(Long id);

    @Query("FROM messages WHERE receiver.id = :id")
    List<MessageEnt> findAllByReceiverId(Long id);

    @Query("FROM messages WHERE uuid = :uuid")
    Optional<MessageEnt> findDistinctFirstByUuid(UUID uuid);

    List<MessageEnt> findAllByReceiver_UserNameAndSender_UserName(String receiverName, String senderName);

    List<MessageEnt> findAllBySender_UserNameAndReceiver_UserName(String senderName, String receiverName);
}
