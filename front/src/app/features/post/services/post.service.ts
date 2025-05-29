import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "src/app/interfaces/post.interface";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private httpClient: HttpClient) { }
    
    getPosts(order: 'asc' | 'desc' = 'desc'): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`/posts?order=${order}`);
    }
}
