<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let hasMore: boolean | undefined = true;
  export let container: HTMLElement | "window" | null = null;
  export let threshold: number = 50;

  const dispatch = createEventDispatcher<{ load: never }>();

  let element: any | null;
  let containerElem: HTMLElement;
  let shouldLoadMore: boolean = false;

  $: if (element) {
    element.addEventListener("scroll", onScroll);
    element.addEventListener("resize", onScroll);
  }

  const onScroll = (e: Event) => {
    if (!hasMore) return;

    const target = e.target as HTMLElement;
    const offset = calcOffset(target);

    if (threshold < offset) {
      shouldLoadMore = false;
      return;
    }

    if (!shouldLoadMore && hasMore) dispatch("load");
    shouldLoadMore = true;
  };
  const calcOffset = (target: any) => {
    const element: HTMLElement = target.documentElement
      ? target.documentElement
      : target;
    return element.scrollHeight - element.clientHeight - element.scrollTop;
  };

  onMount(() => {
    if (container === "window") element = document;
    else if (container) element = container;
    else element = containerElem.parentNode;
  });
  onDestroy(() => {
    if (element) {
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("resize", onScroll);
    }
  });
</script>

{#if !window && !container}
  <div class="hidden" bind:this={containerElem} />
{/if}
