<script lang="ts">
  import { currentGame, nextManualQuestion } from '../stores/store'

  // import { createEventDispatcher } from "svelte"
  import Controls from './Controls.svelte'
  import DisplayPreview from './DisplayPreview.svelte'
  import PlayerStatusList from './PlayerStatusList.svelte'
  import QuestionPreview from './QuestionPreview.svelte'

  let nextQuestion
  // const dispatch = createEventDispatcher()
  // function changeStep(event) {
  //   console.log('change step event: ', event)
  //   dispatch('change-step', { step: event.detail }))
  // }
  $: nextQuestion = $currentGame.manualMode
    ? $nextManualQuestion
    : $currentGame.currentRound === $currentGame.rounds
      ? null
      : $currentGame.questionSet.questions[$currentGame.currentRound]
</script>

<div class="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
  <div class="col-span-4"><Controls on:change-step /></div>
  <div class="row-span-5 col-start-5"><PlayerStatusList /></div>
  <div class="col-span-3 row-span-4 col-start-1 row-start-2"><DisplayPreview /></div>
  <div class="row-span-4 col-start-4 row-start-2">
    <QuestionPreview {nextQuestion} />
  </div>
</div>
