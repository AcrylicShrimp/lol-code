import type { PostSchema } from "./postSchema";

const API_BASE = "https://mwwvlyzmlagvtxywklkc.supabase.co/functions/v1/";

function makePost(): PostSchema {
  const code =
    Math.random() < 0.5
      ? "public static async main(): Promise<void> {\n    console.log('Hello World!'); // A very looooooooooooooooong comment! \n}"
      : undefined;

  return {
    id: Math.random().toString(),
    title: "This is a post !",
    code,
    image: code
      ? undefined
      : {
          id: Math.random().toString(),
          url: "https://cdn.discordapp.com/attachments/762957797368528898/985586719212597399/main-qimg-e0c9dafb319150b6c6d9816047ed9eae-pjlq.jpeg",
          width: 459,
          height: 330,
        },
    upvotes: Math.floor(Math.random() * 100),
    downvotes: Math.floor(Math.random() * 100),
    comments: [
      {
        id: Math.random().toString(),
        content: "개빠르네 2빠",
        writtenAt: new Date(2022, 5, 11),
      },
      {
        id: Math.random().toString(),
        content: "1빠!!!!",
        writtenAt: new Date(2022, 5, 10),
      },
      {
        id: Math.random().toString(),
        content: "1빠",
        writtenAt: new Date(2022, 5, 9),
      },
      {
        id: Math.random().toString(),
        content: "1빠~",
        writtenAt: new Date(2022, 5, 8),
      },
    ],
    writtenAt: new Date(),
  };
}

function getEndpoint(name: string, queryParams?: Record<string, any>): string {
  const queryString = queryParams
    ? Object.entries(queryParams)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";
  return `${API_BASE}${name}${queryString ? `?${queryString}` : ""}`;
}

export async function fetchPosts(after?: number): Promise<PostSchema[]> {
  try {
    const response = await fetch(
      getEndpoint("reader", after ? { after } : undefined)
    );

    if (!response.ok) return [];

    const posts: Record<string, unknown>[] = await response.json();

    for (const post of posts) {
      post.comments = [];
      post.writtenAt = new Date(post.writtenAt as string);

      const contentType = post.contentType as string;
      delete post.contentType;

      const contentUrl = post.contentUrl as string;
      delete post.contentUrl;

      if (contentType === "code") post.code = contentUrl;
      else if (contentType === "image") post.image = contentUrl;
    }

    return posts as PostSchema[];
  } catch {
    return [];
  }
}
