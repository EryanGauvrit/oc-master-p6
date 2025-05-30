import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/interfaces/topic.interface';
import { SessionService } from 'src/app/services/session.service';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent {
  @Input() topic!: Topic;
  @Input() showUnSubscribeButton: boolean = false;

  constructor(private topicService: TopicService, private sessionService: SessionService) { }

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

  unsubscribeFromTopic() {
    this.topicService.unsubscribeFromTopic(this.topic.id).subscribe({
      next: _ => {
        this.topic.subscribed = false;
      },
      error: (err) => {
        console.error('Error unsubscribing from topic:', err);
      }
    });
  }

}
