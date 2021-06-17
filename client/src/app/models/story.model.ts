import { Author } from "./author.model";
import { Comment } from "./comment.model";
import { Fragment } from "./fragment";

export class Story {
  id?: number;
  title?: string;
  genre?: Genre;
  description?: string;
  fragments: Fragment[];
  comments: Comment[];
  owner: Author;
  createdAt?: Date;
  isComplete: boolean = false;
}

export enum Genre {
  Fantasy, SciFi, Horror, Humour
}

export const GENRES = ['Fantasy', 'SciFi', 'Horror', 'Humour'];
