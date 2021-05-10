package org.wzas.didacticmeme.model.auth;

import lombok.Data;

import javax.validation.constraints.NotEmpty;


@Data
public class RegistrationRequest {

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String userName;
}
