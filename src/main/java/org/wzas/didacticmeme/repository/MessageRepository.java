package org.wzas.didacticmeme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wzas.didacticmeme.model.MessageEnt;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface MessageRepository extends JpaRepository<MessageEnt, Long> {
    List<MessageEnt> findAllBySenderId(Long id);

    List<MessageEnt> findAllByReceiverId(Long id);

    Optional<MessageEnt> findDistinctFirstByUuid(UUID uuid);
}
