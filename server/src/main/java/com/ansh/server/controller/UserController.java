package com.ansh.server.controller;

import com.ansh.server.entity.User;
import com.ansh.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        User user = userService.findByIpAddress(ipAddress);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.getUsername());
    }

    //TODO: In future, make this so that the name change is registered in a different collection on mongodb.
    @DeleteMapping("/{ipAddress}")
    public ResponseEntity<String> deleteUser(@PathVariable String ipAddress) {
        User user = userService.findByIpAddress(ipAddress);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(ipAddress);
        return ResponseEntity.ok("User Deleted");
    }
}