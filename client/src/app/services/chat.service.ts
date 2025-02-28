import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

export interface ChatMessage {
  senderName: string;
  messageText: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket$: WebSocketSubject<string> | null = null;
  private roomId: string | null = null;

  constructor(private http: HttpClient) {}

  createRoom(): Observable<string> {
    return this.http.post(
      'https://chatngo-backend.azurewebsites.net/api/room' + '/create',
      {},
      { responseType: 'text' }
    );
  }

  connect(roomId: string): void {
    this.roomId = roomId;
    this.socket$ = new WebSocketSubject(
      `wss://chatngo-backend.azurewebsites.net/ws/${roomId}`
    );
  }

  sendMessage(message: ChatMessage): void {
    if (this.socket$) {
      this.socket$.next(JSON.stringify(message));
    }
  }

  getMessages(): Observable<string> | null {
    return this.socket$ ? this.socket$.asObservable() : null;
  }

  disconnect(): void {
    this.socket$?.complete();
    this.socket$ = null;
  }
}
