<script lang="ts">
  import penToSquare from "@assets/icons/pen-to-square.svg";

  import FloatingLink from "@components/FloatingLink.svelte";
  import InfiniteScroll from "@components/InfiniteScroll.svelte";
  import Post from "@components/Post.svelte";

  import { fetchPosts } from "@libs/api";
  import type { PostSchema } from "@libs/postSchema";

  import { onMount } from "svelte";

  let finished = false;
  let fetching = false;
  let posts: PostSchema[] = [];

  function fillPost() {
    if (finished) return;
    if (fetching) return;

    fetching = true;
    fetchPosts(posts[posts.length - 1]?.id)
      .then((fetched) => {
        if (fetched.length === 0) {
          finished = true;
          return;
        }

        posts = [...posts, ...fetched];
      })
      .finally(() => (fetching = false));
  }

  onMount(() => {
    fillPost();
  });
</script>

<InfiniteScroll
  container="window"
  threshold={450}
  on:load={() => {
    fillPost();
  }}
/>
<FloatingLink href="/post">
  <svg><use href={`#${penToSquare}`} /></svg>
</FloatingLink>
{#each posts as post (post.id)}
  <div class="post">
    <Post {post} />
  </div>
{/each}

<style lang="postcss">
  .post + .post {
    @apply mt-4;
  }

  svg {
    @apply inline;
    width: 1.2em;
    height: 1.2em;
  }
</style>
