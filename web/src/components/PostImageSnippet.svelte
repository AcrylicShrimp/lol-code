<script lang="ts">
  export let url: string;
  export let width: number;
  export let height: number;
</script>

<a href={url} target="_blank">
  <img class="image" src={url} alt="programming related" {width} {height} />
</a>

<style lang="postcss">
  .image {
    @apply w-full rounded-lg;
  }
</style>
