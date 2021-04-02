package org.wzas.didacticmeme.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageEnt {
    private UUID uuid;

    private UserEnt sender;
    private UserEnt receiver;

    private String subject;

    private String content;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean read;

}