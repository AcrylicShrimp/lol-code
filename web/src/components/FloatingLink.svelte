<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="w-[64px] h-[64px] fixed right-20 bottom-16 bg-3/6 border-2 border-2/6 hover:border-4/6 p-2 fill-5/6 duration-200 rounded-full shadow flex items-center justify-center"
>
  <slot />
</a>
