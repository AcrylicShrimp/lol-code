<script lang="ts">
  import InfiniteScroll from "@components/InfiniteScroll.svelte";
  import Post from "@components/Post.svelte";

  import type { PostSchema } from "@libs/postSchema";
  import { onMount } from "svelte";

  let posts: PostSchema[] = [];

  function fillPost() {
    posts = [
      ...posts,
      makePost(),
      makePost(),
      makePost(),
      makePost(),
      makePost(),
    ];
  }

  function makePost(): PostSchema {
    const code =
      Math.random() < 0.5
        ? "public static async main(): Promise<void> {\n    console.log('Hello World!'); // A very looooooooooooooooong comment! \n}"
        : undefined;
    return {
      id: Math.random().toString(),
      content: `This is a post ${posts.length}`,
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

  onMount(() => {
    fillPost();
  });
</script>

{#each posts as post (post.id)}
  <div class="post">
    <Post {post} />
  </div>
{/each}
<InfiniteScroll
  container="window"
  on:load={() => {
    fillPost();
  }}
/>

<style lang="postcss">
  .post + .post {
    @apply mt-4;
  }
</style>
