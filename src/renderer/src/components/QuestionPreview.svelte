<script lang="ts">
  import { Button, Modal } from "flowbite-svelte"
  import { CirclePlusSolid } from "flowbite-svelte-icons"
  import { currentGame, nextManualQuestion } from "../stores/store"
  import ManualQuestionForm from "./ManualQuestionForm.svelte"

  export let nextQuestion
  let manualModeModalOpened = false
</script>

<div class="w-full h-full">
  <h2 class="text-2xl font-bold text-center text-white">Next question</h2>
  {#if nextQuestion}
    <p class="text-xl italic mb-2 mt-2">{nextQuestion.question}</p>
    {#if nextQuestion.options}
      <ul>
        {#each nextQuestion.options as option, index}
          <li class="text-lg">{index + 1}. {option}</li>
        {/each}
      </ul>
    {/if}
    Answer: {nextQuestion.answer}
    {#if nextQuestion.full_answer}
      <p class="text-sm">{nextQuestion.full_answer}</p>
    {/if}
  {:else}
    <p class="text-xl italic mb-2 mt-2">No more questions</p>
  {/if}
  {#if $currentGame.manualMode && $nextManualQuestion == null}
      <Button on:click={() => (manualModeModalOpened = true)}>
        <CirclePlusSolid class="w-6 h-6 me-2" />
        Prepare next manual question
      </Button>
  {/if}

</div>
<Modal bind:open={manualModeModalOpened} class="bg-gray-800">
  <ManualQuestionForm onSubmit={() => (manualModeModalOpened = false)} sendDirectly={false} />
</Modal>
