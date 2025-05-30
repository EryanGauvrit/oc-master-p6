import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Topic } from "src/app/interfaces/topic.interface";
import { CreateTopic } from "../interfaces/createTopic.interface";

@Injectable({
    providedIn: 'root'
})
export class TopicService {

    constructor(private httpClient: HttpClient) { }
    
    getTopics(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>('/topics');
    }

    createTopic({content, title }: CreateTopic): Observable<Topic> {
        return this.httpClient.post<Topic>('/topics', {
            title,
            content
        });
    }

    getUserSubscribedTopics(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>('/topics/subscription');
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
