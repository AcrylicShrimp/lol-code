<button
  class="button flex-initial flex flex-row items-center justify-start rounded-lg border-2 border-2/6/80 hover:border-3/6/80 px-3 py-2 text-3/6 hover:text-5/6 fill-3/6 hover:fill-5/6 duration-200"
>
  <slot name="icon" /><span class="flex-auto w-2" /><slot name="text" />
</button>

<style lang="postcss">
  .button {
    min-width: 4em;
  }
</style>
