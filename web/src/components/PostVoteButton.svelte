<button
  class="button flex-initial flex flex-row items-center justify-start rounded-lg border-2 px-3 py-2"
>
  <slot name="icon" /><span class="flex-auto w-2" /><slot name="text" />
</button>

<style lang="postcss">
  .button {
    min-width: 4em;
  }
</style>
