import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commons/shared.module';
import { TopicCreationComponent } from './components/topic-creation/topic-creation.component';
import { TopicPageComponent } from './components/topic-page/topic-page.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
]

const routes: Routes = [
  { path: '', component:  TopicPageComponent },
  { path: 'create', component:  TopicCreationComponent },
];

@NgModule({
  declarations: [  
    TopicPageComponent, TopicCreationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ...materialModules
  ],
})
export class TopicModule { }
