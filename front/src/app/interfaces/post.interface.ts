import { User } from "src/app/interfaces/user.interface";
import { Topic } from "./topic.interface";
import { Comment } from "./comment.interface";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
    topic: Topic;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}