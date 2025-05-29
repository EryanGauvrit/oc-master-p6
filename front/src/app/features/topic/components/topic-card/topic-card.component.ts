import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent {
  @Input() topic!: Topic;

  constructor(private topicService: TopicService) { }

  subscribeToTopic() {
    this.topicService.subscribeToTopic(this.topic.id).subscribe({
      next: _ => {
        this.topic.subscribed = true;
      },
      error: (err) => {
        console.error('Error subscribing to topic:', err);
      }
    });
  }

}
