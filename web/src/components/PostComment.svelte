<script lang="ts">
  import { formatDistanceToNow } from "date-fns";

  export let index: number;
  export let comment: string;
  export let writtenAt: Date;
</script>

<div
  class="flex flex-col items-stretch justify-start rounded-md border-2 border-4/6/10 px-2 py-1"
>
  <div
    class="flex-initial flex flex-row items-center justify-start pl-1 text-sm text-5/6/40"
  >
    <p class="flex-initial">{index}</p>
    <span class="flex-1" />
    <p class="flex-initial">
      {formatDistanceToNow(writtenAt, { addSuffix: true })}
    </p>
  </div>
  <p class="flex-auto text-lg text-5/6">{comment}</p>
</div>
