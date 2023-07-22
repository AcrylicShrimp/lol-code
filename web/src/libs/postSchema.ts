export interface PostSchema {
  id: number;
  title: string;
  code?: string; // NOTE: Currently this field is a simple string. Maybe we should use markdown to support highlighting.
  // image?: PostImageSnippetSchema;
  image?: string;
  upvotes: number;
  downvotes: number;
  comments: PostCommentSchema[]; // NOTE: The comments should be ordered by time in descending order.
  writtenAt: Date;
}

// export interface PostImageSnippetSchema {
//   id: number;
//   url: string;
//   width: number;
//   height: number;
// }

export interface PostCommentSchema {
  id: number;
  content: string;
  writtenAt: Date;
}
