import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TopicCardComponent } from '../features/topic/components/topic-card/topic-card.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { NavLinkComponent } from './components/nav-link/nav-link.component';

@NgModule({
  declarations: [ButtonBackComponent, TopicCardComponent, NavLinkComponent],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule
  ],
  exports: [ButtonBackComponent, TopicCardComponent, NavLinkComponent]
})
export class SharedModule {}