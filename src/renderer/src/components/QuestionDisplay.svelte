<script lang="ts">
  import { Button, Progressbar } from 'flowbite-svelte'
  import { countdownTime, currentQuestion, socket } from '../stores/store'

  let timeLeft = $countdownTime // Timer state
  let progress = 0
  let showCountdown = false

  $socket.on('countdown', () => {
    console.log('starting countdown')
    timeLeft = $countdownTime
    showCountdown = true
    updateTimer()
  })

  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--
      progress = (($countdownTime - timeLeft) / $countdownTime) * 100
      setTimeout(updateTimer, 1000)
    } else {
      progress = 100
    }
  }
</script>

<div class="p-1 flex flex-col h-full w-full text-white">
  <!-- Question Section -->
  <div class="flex-1 flex flex-col justify-center items-center p-6">
    <h1 class="text-3xl font-bold mb-4 text-center">{$currentQuestion.question}</h1>

    {#if $currentQuestion.options}
      <div class="flex flex-col gap-4 w-full max-w-md">
        {#each $currentQuestion.options as option, index}
          <Button color="light" class="bg-gray-700 hover:bg-gray-600 text-white w-full">
            {index + 1}. {option}
          </Button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Image Section -->
  {#if $currentQuestion.image}
    <div class="flex-1 flex justify-center items-center p-6">
      <img
        src={$currentQuestion.image}
        alt="Question related"
        class="max-w-full max-h-full rounded-md shadow-lg"
      />
    </div>
  {/if}
</div>

{#if showCountdown}<Progressbar {progress} class="absolute bottom-0" />{/if}
