import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { toCapitalize } from "src/app/commons/utils";
import { Post } from "src/app/interfaces/post.interface";
import { CreatePost } from "../interfaces/createPost.interface";
import { Comment } from "src/app/interfaces/comment.interface";

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

    getPostById(postId: number): Observable<Post> {
        return this.httpClient.get<Post>(`/posts/${postId}`).pipe(
            tap(post => {
                post.author.username = toCapitalize(post.author.username);
                post.comments.forEach(comment => {
                    comment.user.username = toCapitalize(comment.user.username);
                });
            })
        );
    }

    addComment(postId: number, content: string): Observable<Comment> {
        return this.httpClient.post<Comment>(`/comments`, { content, postId }).pipe(
            tap(comment => {
                comment.user.username = toCapitalize(comment.user.username);
            })
        );
    }

    createPost(post: CreatePost): Observable<Post> {
        return this.httpClient.post<Post>('/posts', post);
    }
}
