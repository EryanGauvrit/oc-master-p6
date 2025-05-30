import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTopic } from '../../interfaces/createTopic.interface';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.scss']
})
export class TopicCreationComponent {
  public onError = false;
  public form = this.fb.group({
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

  constructor(private router: Router, private fb: FormBuilder, private topicService: TopicService) { }

  public submit(): void {
      const topicRequest = {
        title: this.form.value.title,
        content: this.form.value.content
      } as CreateTopic;
  
      this.topicService.createTopic(topicRequest).subscribe({
        next: () => {
          this.router.navigate(['/topics']);
        },
        error:  error => this.onError = true,
      })
  }

}
