import { Author } from "./author.model";
import { Comment } from "./comment.model";
import { Fragment } from "./fragment.model";
import { Tag } from "./tag.model";

export class Story {
  id?: number;
  title?: string;
  genre?: Genre;
  description?: string;
  fragments: Fragment[];
  comments: Comment[];
  owner: Author;
  tags: Tag[];
  createdAt?: Date;
  isComplete: boolean = false;
  additionalTags?: string;
}

export enum Genre {
  Fantasy, SciFi, Horror, Humour
}

export const GENRES = ['Fantasy', 'SciFi', 'Horror', 'Humour'];

export class PaginatedStories {
  firstPages: number[];
  lastPages: number[];
  previousPages: number[];
  nextPages: number[];
  totalEntities: number;
  entities: Story[];
}
