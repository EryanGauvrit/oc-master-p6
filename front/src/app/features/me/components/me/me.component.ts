import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/features/auth/interfaces/registerRequest.interface';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { TopicService } from 'src/app/features/topic/services/topic.service';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { Topic } from 'src/app/interfaces/topic.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  public subscribedTopics: Topic[] = [];
  public onError = false;
  public form = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        username: [
          '',
          [
            Validators.required,
          ]
        ],
        password: [
          '',
          [
            // 1 uppercase, 1 lowercase, 1 number, 1 special character
            // password example: Abc123!@
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          ]
        ]
      });

  constructor(private topicService: TopicService, private router: Router, private fb: FormBuilder, private sessionService: SessionService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.topicService.getUserSubscribedTopics().subscribe({
      next: (topics: Topic[]) => {
        this.subscribedTopics = topics;
      }
    });
    const session = this.sessionService.sessionInformation;
    if (!session) {
      this.router.navigate(['/auth']);
      return;
    }
    this.form.patchValue({
      email: session.user.email ,
      username: session.user.username,
    });
  }

  public submit(): void {
      const registerRequest = { 
          email: this.form.value.email,
          username: this.form.value.username,
          password: this.form.value.password,       
  
      } as RegisterRequest;
      this.authService.updateUser(registerRequest).subscribe({
        next: (response: SessionInformation) => {
          this.sessionService.logIn(response);
        },
        error: error => this.onError = true,
      });
    }
}
