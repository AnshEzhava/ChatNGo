import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() buttonWidth?: string = 'fit-content';
  @Input() buttonHeight?: string = 'fit-content';
  @Input() fontSize?: string = '36px';
}
