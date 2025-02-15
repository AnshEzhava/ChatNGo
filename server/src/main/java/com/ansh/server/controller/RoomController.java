package com.ansh.server.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final Set<String> activeRooms = new HashSet<>();

    @PostMapping("/create")
    public String createRoom(){
        String roomID;
        do{
            roomID = generateRoomID();
        } while (activeRooms.contains(roomID));

        activeRooms.add(roomID);
        return roomID;
    }

    private String generateRoomID(){
        return UUID.randomUUID().toString();
    }

    @GetMapping("/{roomID}")
    public boolean checkRoomExists(@PathVariable String roomID) {
        return activeRooms.contains(roomID);
    }

    @DeleteMapping("/{roomID}")
    public boolean deleteRoom(@PathVariable String roomID) {
        return activeRooms.remove(roomID);
    }
}
