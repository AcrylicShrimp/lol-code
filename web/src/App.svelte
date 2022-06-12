<script lang="ts">
  import Post from "./components/Post.svelte";
</script>

<main class="p-4 max-w-screen-sm mx-auto">
  <div class="post">
    <Post
      writtenAt={new Date()}
      content={"첫 글입니당\n테스트중\n뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁"}
      code={"public static async main(): Promise<void> {\n    console.log('Hello World!'); // A very looooooooooooooooong comment! \n}"}
      upvoteCount={41}
      downvoteCount={2}
      comments={[
        ["1빠~", new Date(2022, 5, 8)],
        ["1빠", new Date(2022, 5, 9)],
        ["1빠!!!!", new Date(2022, 5, 10)],
        ["개빠르네 2빠", new Date(2022, 5, 11)],
      ]}
    />
  </div>
  <div class="post">
    <Post
      writtenAt={new Date()}
      content={"첫 글입니당\n테스트중\n뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁뷁"}
      image={[
        "https://cdn.discordapp.com/attachments/762957797368528898/985586719212597399/main-qimg-e0c9dafb319150b6c6d9816047ed9eae-pjlq.jpeg",
        459,
        330,
      ]}
      upvoteCount={41}
      downvoteCount={2}
      comments={[
        ["1빠~", new Date(2022, 5, 8)],
        ["1빠", new Date(2022, 5, 9)],
        ["1빠!!!!", new Date(2022, 5, 10)],
        ["개빠르네 2빠", new Date(2022, 5, 11)],
      ]}
    />
  </div>
</main>

<style lang="postcss">
  .post + .post {
    @apply mt-4;
  }
</style>
