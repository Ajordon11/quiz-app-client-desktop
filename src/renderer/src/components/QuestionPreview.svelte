<script lang="ts">
  import { currentGame } from '../stores/store'

  $: nextQuestion =
    $currentGame.currentRound === $currentGame.rounds
      ? null
      : $currentGame.questionSet.questions[$currentGame.currentRound]
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
</div>
