import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessionoptions',
  standalone: true,
  imports: [],
  templateUrl: './sessionoptions.component.html',
  styleUrl: './sessionoptions.component.css',
})
export class SessionoptionsComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  userIp: string = '';

  ngOnInit(): void {
    this.userService.getUserIp().subscribe(
      (response) => {
        this.userIp = response.ip;
        console.log('User IP:', this.userIp);

        // TODO: Make this not be a nested callback in future
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
}
