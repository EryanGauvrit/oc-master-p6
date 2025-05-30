import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/features/topic/services/topic.service';
import { Topic } from 'src/app/interfaces/topic.interface';
import { CreatePost } from '../../interfaces/createPost.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {
  public onError = false;
  public topics: Topic[] = []
  public form = this.fb.group({
      topicId: [
        '',
        [
          Validators.required,
        ]
      ],
      title: [
        '',
        [
          Validators.required,
        ]
      ],
      content: [
        '',
        [
          Validators.required,
        ]
      ]
  });

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router, private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe({
      next: (topics: Topic[]) => {
        this.topics = topics;
      },
    });
  }
  public submit(): void {
    const postRequest = {
      topicId: this.form.value.topicId,
      title: this.form.value.title,
      content: this.form.value.content
    } as CreatePost;

    this.postService.createPost(postRequest).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error:  error => this.onError = true,
    })
  }

}
