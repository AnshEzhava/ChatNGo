import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket$: WebSocketSubject<any> | null = null;

  connect(roomID: string): void {
    this.socket$ = new WebSocketSubject(`ws://localhost:8080/ws/${roomID}`);
  }

  sendMessage(message: string): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  getMessage() {
    return this.socket$?.asObservable;
  }

  disconnect(): void {
    this.socket$?.complete();
    this.socket$ = null;
  }
}
