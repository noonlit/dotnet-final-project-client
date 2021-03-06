export class Comment {
  id?: number;
  text?: string;
  storyId?: number;
  userId?: string;
}

export class PaginatedComments {
  firstPages: number[];
  lastPages: number[];
  previousPages: number[];
  nextPages: number[];
  totalEntities: number;
  entities: Comment[];
}
