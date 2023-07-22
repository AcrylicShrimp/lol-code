<script lang="ts">
  import penSvg from "@assets/icons/pen.svg";

  import Icon from "@components/Icon.svelte";
  import PostComment from "@components/PostComment.svelte";
  import PostCommentLoadButton from "@components/PostCommentLoadButton.svelte";

  import type { PostCommentSchema } from "@libs/postSchema";

  export let comments: PostCommentSchema[];
</script>

<div class="flex flex-row items-center justify-start">
  <input
    type="text"
    placeholder="Write a comment..."
    class="flex-auto rounded-lg px-2 py-1 bg-0/6 text-lg text-5/6 outline-0"
  />
  <span class="flex-initial w-2" />
  <button
    class="flex-initial flex items-center justify-center px-4 py-3 rounded-md bg-3/6 border-2 border-2/6 hover:border-4/6 p-2 fill-5/6 duration-200"
  >
    <Icon svg={penSvg} />
  </button>
</div>
<div class="mt-4">
  {#each comments as comment, index}
    <div class="comment">
      <PostComment
        index={comments.length - index}
        comment={comment.content}
        writtenAt={comment.writtenAt}
      />
    </div>
  {/each}
</div>
<div class="mt-4 flex flex-col items-center justify-start">
  <PostCommentLoadButton />
</div>

<style lang="postcss">
  .comment + .comment {
    @apply mt-2;
  }
</style>
