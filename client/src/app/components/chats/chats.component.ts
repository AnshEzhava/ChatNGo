import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  @Input() senderName: string = 'User';
  @Input() message: string = '';
}
