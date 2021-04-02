package org.wzas.didacticmeme.web.conroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/testendpoint")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok().body("hello world");
    }
}
