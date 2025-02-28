import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatsComponent } from '../../components/chats/chats.component';
import { ChatMessage, ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatsComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  roomID: string | null = '';
  messages: ChatMessage[] = [];
  message: string = '';
  senderName = localStorage.getItem('name') || 'Anonymous';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.roomID = localStorage.getItem('roomID');

    if (this.roomID) {
      this.chatService.connect(this.roomID);

      this.chatService.getMessages()?.subscribe((msg) => {
        const parsedMsg: ChatMessage = JSON.parse(msg);
        this.messages.push(parsedMsg);
      });
    }
  }

  sendMessage(): void {
    if (this.message.trim() !== '' && this.roomID) {
      const newMessage: ChatMessage = {
        senderName: this.senderName,
        messageText: this.message,
      };

      this.chatService.sendMessage(newMessage);
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
