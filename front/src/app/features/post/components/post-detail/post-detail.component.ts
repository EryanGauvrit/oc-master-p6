import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public post!: Post;
  public postId!: number;
  public onError = false;

  public form = this.fb.group({
        content: [
          '',
          [
            Validators.required,
          ]
        ]
      });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private postService: PostService, private router: Router ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('postId');
    if (id) {
      this.postId = parseInt(id);
      this.postService.getPostById(this.postId).subscribe({
        next: (post: Post) => {
          this.post = post;
        },
        error: (err) => {
          console.error('Error fetching post:', err);
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }

  }

  submitComment(): void {

    this.postService.addComment(this.postId, this.form.value.content as string).subscribe({
      next: (comment) => {
        this.post.comments.push(comment);
        this.form.reset();
        this.onError = false;
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.onError = true;
      }
    });
  }

}
