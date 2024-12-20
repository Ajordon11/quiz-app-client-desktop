<script lang="ts">
  import { Button } from 'flowbite-svelte';

  export let question = "What is the capital of France?";
  export let answers = ["Paris", "Berlin", "Madrid", "Rome"];
  export let imageUrl = "https://www.w3schools.com/w3images/paris.jpg"; // Replace with your image URL
</script>

<div class="p-1 flex flex-col h-full w-full text-white">
  <!-- Question Section -->
  <div class="flex-1 flex flex-col justify-center items-center p-6">
    <h1 class="text-3xl font-bold mb-4 text-center">{question}</h1>

    <div class="flex flex-col gap-4 w-full max-w-md">
      {#each answers as answer, index}
        <Button color="light" class="bg-gray-700 hover:bg-gray-600 text-white w-full">
          {index + 1}. {answer}
        </Button>
      {/each}
    </div>
  </div>

  <!-- Image Section -->
  {#if imageUrl}
    <div class="flex-1 flex justify-center items-center p-6">
      <img src={imageUrl} alt="Question related" class="max-w-full max-h-full rounded-md shadow-lg" />
    </div>
  {/if}
</div>
