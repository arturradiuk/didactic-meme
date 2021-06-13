package org.wzas.didacticmeme.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SendMessageDto {
    private String receiver;
    private String content;
}
