<script lang="ts">
  export let index: number;
  export let comment: string;
  export let writtenAt: Date;

  import { formatDistanceToNow } from "date-fns";
</script>

<div
  class="flex flex-col items-stretch justify-start rounded-md border-2 px-2 py-1"
>
  <div
    class="flex-initial flex flex-row items-center justify-start pl-1 text-sm text-stone-400"
  >
    <p class="flex-initial">{index + 1}</p>
    <span class="flex-1" />
    <p class="flex-initial">
      {formatDistanceToNow(writtenAt, { addSuffix: true })}
    </p>
  </div>
  <p class="flex-auto text-lg">{comment}</p>
</div>
