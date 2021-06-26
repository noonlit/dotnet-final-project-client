import { Author } from "./author.model";

export class Fragment {
  id?: number;
  text?: string;
  position?: number;
  storyId?: number;
  userId?: string;
  user?: Author
  isLast?: boolean = false;
}

export class PaginatedFragments {
  firstPages: number[];
  lastPages: number[];
  previousPages: number[];
  nextPages: number[];
  totalEntities: number;
  entities: Fragment[];
}
