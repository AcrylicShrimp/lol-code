<script lang="ts">
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

<article class="bg-white rounded-lg border-2 p-4">
  <section>
    <p class="pl-2 text-sm text-stone-500">
      {formatDistanceToNow(writtenAt, { addSuffix: true })}
    </p>
    <p class="mt-3 text-lg">{content}</p>
  </section>
  <section class="mt-8">
    {#if code}
      <PostTextSnippet text={code} />
    {:else}
      <PostImageSnippet url={image[0]} width={image[1]} height={image[2]} />
    {/if}
  </section>
  <section class="mt-8 text-xl flex flex-row items-center justify-start">
    <PostVoteButton>
      <svg slot="icon"><use href={`#${upLongSvg}`} /></svg>
      <span slot="text">{upvoteCount}</span>
    </PostVoteButton>
    <span class="flex-initial w-4" />
    <PostVoteButton>
      <svg slot="icon"><use href={`#${downLongSvg}`} /></svg>
      <span slot="text">{downvoteCount}</span>
    </PostVoteButton>
    <span class="flex-1" />
    <PostCommentIndicator commentCount={comments.length} />
  </section>
  <hr class="mt-8 rounded-sm border-0 h-0.5 bg-slate-200" />
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
