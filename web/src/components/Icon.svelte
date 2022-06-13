<script lang="ts">
  export let svg: string;
</script>

<svg class="svg"><use href={`#${svg}`} /></svg>

<style lang="postcss">
  .svg {
    @apply inline;
    width: 1em;
    height: 1em;
  }
</style>
