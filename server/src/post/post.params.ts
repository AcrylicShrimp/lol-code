export interface GetFeedsBody {
  afterId?: string;
}

export interface GetCommentsBody {
  beforeIndex?: number;
  afterIndex?: number;
}

export interface PostCommentBody {
  content: string;
}
