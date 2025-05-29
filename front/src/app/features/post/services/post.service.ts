import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { toCapitalize } from "src/app/commons/utils";
import { Post } from "src/app/interfaces/post.interface";
import { CreatePost } from "../interfaces/createPost.interface";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private httpClient: HttpClient) { }
    
    getPosts(order: 'asc' | 'desc' = 'desc'): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`/posts?order=${order}`).pipe(
            tap(posts => {
                posts.forEach(post => {
                    post.author.username = toCapitalize(post.author.username);
                });
            })
        );
    }

    createPost(post: CreatePost): Observable<Post> {
        return this.httpClient.post<Post>('/posts', post);
    }
}
