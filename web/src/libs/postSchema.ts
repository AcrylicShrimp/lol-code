export interface PostSchema {
  id: string;
  content: string;
  code?: string; // NOTE: Currently this field is a simple string. Maybe we should use markdown to support highlighting.
  image?: PostImageSnippetSchema;
  upvotes: number;
  downvotes: number;
  comments: PostCommentSchema[]; // NOTE: The comments should be ordered by time in descending order.
  writtenAt: Date;
}

export interface PostImageSnippetSchema {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface PostCommentSchema {
  id: string;
  content: string;
  writtenAt: Date;
}
