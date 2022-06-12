<script lang="ts">
  import { formatNumber } from "@libs/formatNumber";

  import upLongSvg from "@assets/icons/arrow-up-long.svg";
  import downLongSvg from "@assets/icons/arrow-down-long.svg";

  import PostVoteButton from "./PostVoteButton.svelte";
  import PostCommentIndicator from "./PostCommentIndicator.svelte";
  import PostCommentList from "./PostCommentList.svelte";
  import PostTextSnippet from "./PostTextSnippet.svelte";
  import PostImageSnippet from "./PostImageSnippet.svelte";

  export let content: string;
  export let code: string | null = null;
  export let image: [string, number, number] | null = null;
  export let upvoteCount: number;
  export let downvoteCount: number;
  export let comments: [string, Date][];
  export let writtenAt: Date;

  import { formatDistanceToNow } from "date-fns";
</script>

<article class="bg-1/6 rounded-lg border-2/6/20 border-2 p-4">
  <section>
    <p class="pl-2 text-sm text-5/6/60">
      {formatDistanceToNow(writtenAt, { addSuffix: true })}
    </p>
    <p class="mt-3 text-lg text-5/6">{content}</p>
  </section>
  <section class="mt-8">
    {#if code}
      <PostTextSnippet text={code} />
    {:else}
      <PostImageSnippet url={image[0]} width={image[1]} height={image[2]} />
    {/if}
  </section>
  <section class="mt-8 text-base flex flex-row items-center justify-start">
    <PostVoteButton>
      <svg slot="icon"><use href={`#${upLongSvg}`} /></svg>
      <span slot="text">{formatNumber(upvoteCount)}</span>
    </PostVoteButton>
    <span class="flex-initial w-4" />
    <PostVoteButton>
      <svg slot="icon"><use href={`#${downLongSvg}`} /></svg>
      <span slot="text">{formatNumber(downvoteCount)}</span>
    </PostVoteButton>
    <span class="flex-1" />
    <PostCommentIndicator commentCount={comments.length} />
  </section>
  <hr class="mt-8 rounded-sm border-0 h-0.5 bg-3/6/40" />
  <section class="mt-8">
    <PostCommentList {comments} />
  </section>
</article>

<style lang="postcss">
  svg {
    @apply inline;
    width: 1.2em;
    height: 1.2em;
  }
</style>
