import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonBackComponent } from './components/button-back/button-back.component';

@NgModule({
  declarations: [ButtonBackComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ButtonBackComponent]
})
export class SharedModule {}