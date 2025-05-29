import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  order: 'asc' | 'desc' = 'desc';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.order).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      }
    })
  }

  toggleOrder(): void {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.postService.getPosts(this.order).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      }
    });
  }

}
