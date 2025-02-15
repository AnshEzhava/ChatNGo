import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NgModule } from '@angular/core';
import { SessionoptionsComponent } from './pages/sessionoptions/sessionoptions.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'options',
    component: SessionoptionsComponent,
    data: { animation: 'OptionsPage' },
  },
  {
    path: 'chat/:roomID',
    component: ChatComponent,
    data: { animation: 'ChatPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
