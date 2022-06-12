<script lang="ts">
  import { formatNumber } from "@libs/formatNumber";

  import messageDotsSvg from "@assets/icons/message-dots.svg";

  export let commentCount: number;
</script>

<div
  class="indicator text-stone-400 flex-initial flex flex-row items-center justify-start rounded-lg px-3 py-2 text-3/6 fill-3/6"
>
  <svg><use href={`#${messageDotsSvg}`} /></svg><span
    class="flex-auto w-2"
  />{formatNumber(commentCount)}
</div>

<style lang="postcss">
  .indicator {
    min-width: 4em;
  }

  svg {
    @apply inline;
    width: 1.2em;
    height: 1.2em;
  }
</style>
