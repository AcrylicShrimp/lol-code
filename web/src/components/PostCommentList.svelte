<script lang="ts">
  import PostComment from "./PostComment.svelte";
  import PostCommentLoadButton from "./PostCommentLoadButton.svelte";

  export let comments: [string, Date][];
</script>

{#each comments as comment, index}
  <div class="comment">
    <PostComment {index} comment={comment[0]} writtenAt={comment[1]} />
  </div>
{/each}
<div class="mt-4 flex flex-col items-center justify-start">
  <PostCommentLoadButton />
</div>

<style lang="postcss">
  .comment + .comment {
    @apply mt-2;
  }
</style>
