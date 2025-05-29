import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commons/shared.module';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDividerModule
]

const routes: Routes = [
  { path: '', component:  PostListComponent },
  { path: 'posts/create', component:  PostCreationComponent },
  { path: 'posts/:postId', component: PostDetailComponent },
];

@NgModule({
  declarations: [
    PostCardComponent,
    PostListComponent,
    PostCreationComponent,
    PostDetailComponent
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
export class PostModule { }
