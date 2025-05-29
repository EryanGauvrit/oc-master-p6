import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Topic } from "src/app/interfaces/topic.interface";

@Injectable({
    providedIn: 'root'
})
export class TopicService {

    constructor(private httpClient: HttpClient) { }
    
    getTopics(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>('/topics');
    }

    subscribeToTopic(topicId: number): Observable<void> {
        return this.httpClient.post<void>(`/topics/subscription`, {
            topicId,
        });
    }

    unsubscribeFromTopic(topicId: number): Observable<void> {
        return this.httpClient.delete<void>(`/topics/subscription/${topicId}`);
    }
}
