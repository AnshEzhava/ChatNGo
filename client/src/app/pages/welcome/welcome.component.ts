import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  username: string = '';
  userIp: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserIp().subscribe(
      (response) => {
        this.userIp = response.ip;
        console.log('User IP:', this.userIp);

        //TODO: Make it to be a non nested callback in future
        this.userService.findRegisteredUser(this.userIp).subscribe(
          (response) => {
            console.log('Registered User:', response);
            if (response != 'Not Found') {
              console.log('User already registered');
              this.router.navigate(['/options']);
            } else {
              console.log('User not registered');
            }
          },
          (error) => console.error('Error fetching user:', error)
        );
      },
      (error) => console.error('Error fetching IP:', error)
    );
  }

  sendUserData(): void {
    if (this.username.trim() === '') {
      console.error('Username is required');
      return;
    }

    console.log('Sending User Data:', {
      name: this.username,
      ip: this.userIp,
    });

    this.userService.saveUser(this.username, this.userIp).subscribe(
      (response) => {
        console.log('User saved successfully:', response);
      },
      (error) => console.error('Error saving user:', error)
    );
    this.router.navigate(['/options']);
  }
}
