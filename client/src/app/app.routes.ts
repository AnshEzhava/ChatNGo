import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'chat',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
