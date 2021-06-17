import { Author } from "./author.model";

export class Fragment {
  id?: number;
  text?: string;
  position?: number;
  storyId?: number;
  userId?: string;
  user?: Author
}
