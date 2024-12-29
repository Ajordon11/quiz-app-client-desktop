<script lang="ts">
  import { Progressbar } from 'flowbite-svelte'
  import {
    countdownTime,
    currentGame,
    currentQuestion,
    githubDataUrl,
    socket
  } from '../stores/store'
  import { linear } from 'svelte/easing'

  let timeLeft = $countdownTime // Timer state
  let progress = 0
  let showCountdown = false
  let correctAnswer = ''
  let correctAnswerFull = null
  let isHttpImage = false
  let isWideImage = false
  let imageLoaded = false
  let correctPlayers = 0

  $socket.on('countdown', () => {
    console.log('starting countdown')
    timeLeft = $countdownTime
    showCountdown = true
    updateTimer()
  })

  $socket.on(
    'correct-answer',
    (data: { answer: string; full: string | null; correctPlayers: number }) => {
      correctAnswer = data.answer
      correctAnswerFull = data.full
      correctPlayers = data.correctPlayers
      showCountdown = false
      progress = 0
    }
  )

  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--
      progress = (($countdownTime - timeLeft) / $countdownTime) * 100
      setTimeout(updateTimer, 1000)
    } else {
      progress = 100
    }
  }
  $: if ($currentQuestion) {
    correctAnswer = ''
    correctAnswerFull = null
    isHttpImage =
      $currentQuestion.image?.startsWith('http://') ||
      $currentQuestion.image?.startsWith('https://')
    console.log('do we have image? ', $currentQuestion.image, isHttpImage)
    if ($currentQuestion.image == null) {
      imageLoaded = false
    } else {
      if (!isHttpImage) {
        $currentQuestion.image = `${$githubDataUrl}/images/${$currentQuestion.image}`
      }
      const img = new Image()
      img.src = $currentQuestion.image
      if (img.complete) {
        imageLoaded = true
        isWideImage = img.width > img.height
      } else {
        img.onload = () => {
          imageLoaded = true
          isWideImage = img.width > img.height
          console.log('dimensions of the image: ', img.width, img.height, ', wide? ', isWideImage)
        }
      }
    }
  }
</script>

<div class="p-1 flex flex-col h-full w-full text-white mt-5">
  <!-- Question Section -->
  <div class="flex-1 flex flex-col justify-center items-center p-6">
    <h1 class="text-3xl font-bold mb-4 text-center">{$currentQuestion.question}</h1>

    <!-- Grid for no image -->
    {#if imageLoaded === false}
      <div class="grid grid-cols-1 gap-4 w-full p-6">
        {#if $currentQuestion.options && correctAnswer === ''}
          {#each $currentQuestion.options as option, index}
            <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 class="text-2xl font-semibold mb-2">{index + 1}. {option}</h2>
            </div>
          {/each}
        {/if}

        {#if correctAnswer !== ''}
          <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 class="text-2xl font-semibold mb-2">{correctAnswer}</h2>
            {#if correctAnswerFull}<p class="text-lg">{correctAnswerFull}</p>{/if}
            {#if typeof $currentGame.players === 'number'}
              <p class="text-lg">
                {correctPlayers}/{$currentGame.players} players answered correctly
              </p>
            {:else if $currentGame.players.length > 0}
              <p class="text-lg">
                {correctPlayers}/{$currentGame.players.length} players answered correctly
              </p>
            {/if}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Grid for options + image -->
    {#if imageLoaded && $currentQuestion.options}
      <div class="grid grid-cols-5 grid-rows-5 gap-4">
        <div class="col-span-2 row-span-5 p-6">
          {#if $currentQuestion.options && correctAnswer === ''}
            {#each $currentQuestion.options as option, index}
              <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition mb-2">
                <h2 class="text-2xl font-semibold mb-2">{index + 1}. {option}</h2>
              </div>
            {/each}
          {/if}

          {#if correctAnswer !== ''}
            <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 class="text-2xl font-semibold mb-2">{correctAnswer}</h2>
              {#if correctAnswerFull}<p class="text-lg">{correctAnswerFull}</p>{/if}
            </div>
          {/if}
        </div>
        <div class="col-span-3 row-span-5 col-start-3">
          <div class="flex-1 flex justify-center items-center p-6">
            <img
              src={$currentQuestion.image}
              alt="Question related"
              class="max-w-full max-h-full rounded-md shadow-lg"
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- Grid for just image -->
    {#if imageLoaded && !$currentQuestion.options}
      <div class="flex-1 flex justify-center items-center p-6">
        {#if correctAnswer !== ''}
          <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 class="text-2xl font-semibold mb-2">{correctAnswer}</h2>
            {#if correctAnswerFull}<p class="text-lg">{correctAnswerFull}</p>{/if}
          </div>
        {/if}
        <img
          src={$currentQuestion.image}
          alt="Question related"
          class="max-w-full max-h-full rounded-md shadow-lg"
        />
      </div>
    {/if}
  </div>
</div>
{#if showCountdown}<Progressbar
    {progress}
    animate
    easing={linear}
    tweenDuration={1000}
    class="absolute bottom-0"
    color="indigo"
    size="h-6"
  />{/if}
