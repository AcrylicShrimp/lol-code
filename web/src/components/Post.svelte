<script lang="ts">
  import { formatDistanceToNow } from "date-fns";

  import upLongSvg from "@assets/icons/arrow-up-long.svg";
  import downLongSvg from "@assets/icons/arrow-down-long.svg";

  import PostVoteButton from "@components/PostVoteButton.svelte";
  import PostCommentIndicator from "@components/PostCommentIndicator.svelte";
  import PostCommentList from "@components/PostCommentList.svelte";
  import PostTextSnippet from "@components/PostTextSnippet.svelte";
  import PostImageSnippet from "@components/PostImageSnippet.svelte";

  import { formatNumber } from "@libs/formatNumber";
  import type { PostSchema } from "@libs/postSchema";

  export let post: PostSchema;
</script>

<article class="bg-1/6 rounded-lg border-2/6/20 border-2 p-4">
  <section>
    <p class="pl-2 text-sm text-5/6/60">
      {formatDistanceToNow(post.writtenAt, { addSuffix: true })}
    </p>
    <p class="mt-3 text-lg text-5/6">{post.content}</p>
  </section>
  <section class="mt-8">
    {#if post.image}
      <PostImageSnippet
        url={post.image.url}
        width={post.image.width}
        height={post.image.height}
      />
    {:else}
      <PostTextSnippet text={post.code} />
    {/if}
  </section>
  <section class="mt-8 text-base flex flex-row items-center justify-start">
    <PostVoteButton>
      <svg slot="icon"><use href={`#${upLongSvg}`} /></svg>
      <span slot="text">{formatNumber(post.upvotes)}</span>
    </PostVoteButton>
    <span class="flex-initial w-4" />
    <PostVoteButton>
      <svg slot="icon"><use href={`#${downLongSvg}`} /></svg>
      <span slot="text">{formatNumber(post.downvotes)}</span>
    </PostVoteButton>
    <span class="flex-1" />
    <PostCommentIndicator commentCount={post.comments.length} />
  </section>
  <hr class="mt-8 rounded-sm border-0 h-0.5 bg-3/6/40" />
  <section class="mt-8">
    <PostCommentList comments={post.comments} />
  </section>
</article>

<style lang="postcss">
  svg {
    @apply inline;
    width: 1.2em;
    height: 1.2em;
  }
</style>
