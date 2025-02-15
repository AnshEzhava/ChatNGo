package com.ansh.server.websockets;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private static final Map<String, List<WebSocketSession>> sessions = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomID = extractRoomId(session);
        sessions.putIfAbsent(roomID, new ArrayList<>());
        sessions.get(roomID).add(session);
        System.out.println("New connection in room: " + roomID);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomID = extractRoomId(session);
        List<WebSocketSession> roomSessions = sessions.get(roomID);

        if (roomSessions != null) {
            for (WebSocketSession s : roomSessions) {
                if (s.isOpen()) {
                    s.sendMessage(message);
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomID = extractRoomId(session);
        List<WebSocketSession> roomSessions = sessions.get(roomID);
        if (roomSessions != null) {
            roomSessions.remove(session);
            if (roomSessions.isEmpty()) {
                sessions.remove(roomID);
                System.out.println("Room " + roomID + " is now empty and removed.");
            }
        }
    }

    private String extractRoomId(WebSocketSession session) {
        return session.getUri().getPath().split("/ws/")[1];
    }
}