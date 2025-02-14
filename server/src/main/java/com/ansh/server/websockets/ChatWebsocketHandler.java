package com.ansh.server.websockets;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChatWebsocketHandler extends TextWebSocketHandler {
    private static final Map<String, List<WebSocketSession>> sessions = new HashMap<>();

    public void afterConnectionEstablished(WebSocketSession session, TextMessage message) throws Exception {
        String roomID = session.getUri().getPath().split("/ws/")[1];
        sessions.putIfAbsent(roomID, new ArrayList<>());
        sessions.get(roomID).add(session);
    }

    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomID = session.getUri().getQuery().split("/ws/")[1];
        for(WebSocketSession s : sessions.get(roomID)){
            if(s.isOpen()){
                s.sendMessage(message);
            }
        }
    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomID = session.getUri().getQuery().split("/ws/")[1];
        sessions.get(roomID).remove(session);
        if(sessions.get(roomID).isEmpty()){
            sessions.remove(roomID);
        }
    }


}
