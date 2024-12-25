<script lang="ts">
  import { currentQuestion } from '../stores/store'
  import QuestionDisplay from './QuestionDisplay.svelte'
</script>

<div class="p-2 w-full h-full">
  <h2 class="text-2xl font-bold text-white">Second display preview</h2>
  {#if $currentQuestion}
    <div class=" border-2 border-gray-700 rounded-lg">
      <QuestionDisplay />
    </div>
  {/if}
</div>
