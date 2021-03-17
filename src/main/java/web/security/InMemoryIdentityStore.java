package web.security;


import entities.User;
import services.IUsersService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.security.enterprise.credential.Credential;
import javax.security.enterprise.credential.UsernamePasswordCredential;
import javax.security.enterprise.identitystore.CredentialValidationResult;
import javax.security.enterprise.identitystore.IdentityStore;
import javax.swing.text.html.Option;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@ApplicationScoped
public class InMemoryIdentityStore
        implements IdentityStore {
    @Inject
    private IUsersService usersService;

    @Override
    public Set<String> getCallerGroups(CredentialValidationResult validationResult) {
        return IdentityStore.super.getCallerGroups(validationResult);
    }

    @Override
    public CredentialValidationResult validate(Credential credential) {
        if (credential instanceof UsernamePasswordCredential) {
            UsernamePasswordCredential usernamePasswordCredential = (UsernamePasswordCredential) credential;
            Optional<User> user = usersService.findByEmailAndPassword(usernamePasswordCredential.getCaller(), usernamePasswordCredential.getPasswordAsString());

            if (user.isPresent()) {
                Set<String> accessLevelsStr = new HashSet<>();
                accessLevelsStr.add(user.get().getAccessLevel().toString());
                return new CredentialValidationResult(user.get().getEmail(), accessLevelsStr);
            } else {
                return CredentialValidationResult.INVALID_RESULT;
            }

        }
        return CredentialValidationResult.NOT_VALIDATED_RESULT;

    }

}
