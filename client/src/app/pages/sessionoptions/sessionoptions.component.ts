import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sessionoptions',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './sessionoptions.component.html',
  styleUrl: './sessionoptions.component.css',
  animations: [
    trigger('widthAnimation', [
      transition(':enter', [
        style({ width: '300px' }),
        animate('300ms ease-out', style({ width: '600px' })),
      ]),
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class SessionoptionsComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  userIp: string = '';
  isJoinExpanded: boolean = false;
  roomCode: string = '';

  ngOnInit(): void {
    this.userService.getUserIp().subscribe(
      (response) => {
        this.userIp = response.ip;
        console.log('User IP:', this.userIp);
        this.userService.findRegisteredUser(this.userIp).subscribe(
          (response) => {
            console.log('User found:', response);
          },
          (error) => {
            if (error.status === 404) {
              console.warn('User not found, redirecting to /welcome');
              this.router.navigate(['/welcome']);
            } else {
              console.error('An error occurred:', error);
            }
          }
        );
      },
      (error) => console.error('Error fetching IP:', error)
    );
  }

  submitRoomCode() {
    console.log('Room code:', this.roomCode);
  }

  toggleJoinRoom() {
    this.isJoinExpanded = !this.isJoinExpanded;
  }
}
