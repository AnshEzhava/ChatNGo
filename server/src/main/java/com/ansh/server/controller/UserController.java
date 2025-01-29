package com.ansh.server.controller;

import com.ansh.server.entity.User;
import com.ansh.server.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/save")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        System.out.println("Username: " + user.getUsername());
        System.out.println("User IP: " + user.getIpAddress());
        userService.saveUser(user);
        return ResponseEntity.ok("User Saved");
    }

    @GetMapping("/{ipAddress}")
    public ResponseEntity<String> getUser(@PathVariable String ipAddress) {
        userService.findByIpAddress(ipAddress);
        if(userService.findByIpAddress(ipAddress) == null) {
            return ResponseEntity.notFound().build();
        } else {
            User user = userService.findByIpAddress(ipAddress);
            return ResponseEntity.ok(user.getUsername());
        }
    }

}
