<script lang="ts">
  import { Button, Modal } from 'flowbite-svelte'
  import {
    countdownTime,
    currentGame,
    currentGameId,
    currentQuestion,
    players,
    socket,
    showScore,
    nextManualQuestion
  } from '../stores/store'
  import { addAlert, clearAlerts } from '../stores/alerts'
  import { createEventDispatcher } from 'svelte'
  import ManualQuestionForm from './ManualQuestionForm.svelte'

  let timer = $countdownTime // Timer state
  let isCountingDown = false // Countdown active state
  let interval
  let canStartCountdown = true
  let canShowAnswer = false
  let canSendNextQuestion = $currentGame.manualMode
  let canShowScore = false
  let manualModeModalOpened = false
  let sendDirectly = false

  const dispatch = createEventDispatcher()

  const sendCountdownMessage = () => {
    console.log('Sending countdown message ', $currentGameId)
    $socket.emit('start-countdown', { gameId: $currentGameId })
  }

  $socket.on('countdown', () => {
    console.log('starting countdown')
    canStartCountdown = false
    startCountdown()
  })

  // Start the countdown timer
  const startCountdown = () => {
    if (isCountingDown) return // Prevent multiple countdowns
    isCountingDown = true
    timer = $countdownTime
    interval = setInterval(() => {
      if (timer > 0) {
        timer--
      } else {
        stopCountdown()
        canShowScore = true
      }
    }, 1000)
  }

  // Stop the countdown timer
  const stopCountdown = () => {
    clearInterval(interval)
    isCountingDown = false
    canShowAnswer = true
    dispatch('change-step', { step: 3 })
  }

  const sendShowAnswerMessage = () => {
    $socket.emit('show-answer', { gameId: $currentGameId })
  }

  const sendShowFirstMessage = () => {
    $socket.emit('show-first', { gameId: $currentGameId }, (response) => {
      console.log('Response from server on show first: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
      } else {
        console.log('music is playing ')
      }
    })
  }

  $socket.on('correct-answer', (_answer) => {
    console.log('correct answer received: ', _answer)
    canSendNextQuestion = true
    canShowAnswer = false
    canStartCountdown = false
    dispatch('change-step', { step: 4 })
  })

  const sendNextQuestion = () => {
    if ($currentGame.currentRound >= $currentGame.rounds) {
      addAlert({ title: 'Error', message: 'No more questions, show score instead', color: 'red' })
      return
    }
    if ($currentGame.manualMode && $nextManualQuestion == null) {
      manualModeModalOpened = true
      sendDirectly = true
      return
    }
    if ($currentGame.manualMode) {
      $socket.emit(
        'next-round-manual',
        { gameId: $currentGameId, ...$nextManualQuestion },
        (response) => {
          console.log('Response from server on next round manual: ', response)
          if (!response.success) {
            addAlert({ title: 'Error', message: response.message, color: 'red' })
          } else {
            clearAlerts()
            handleResponse(response)
          }
        }
      )
    } else {
      $socket.emit('next-round', { gameId: $currentGameId }, (response) => {
        console.log('Response from server on next round: ', response)
        handleResponse(response)
      })
    }
  }

  const handleResponse = (response) => {
    sendDirectly = false
    $nextManualQuestion = null
    if (!response.success) {
      addAlert({ title: 'Error', message: response.message, color: 'red' })
    } else if (response.data === null) {
      addAlert({ title: 'Warning', message: response.message, color: 'yellow' })
      canStartCountdown = false
      canSendNextQuestion = false
      canShowAnswer = false
      canShowScore = true
      dispatch('change-step', { step: 5 })
    } else {
      manualModeModalOpened = false
      canShowScore = false
      $currentQuestion = response.data.question
      $players = $players.map((p) => ({ ...p, lastAnswer: '' }))
      canStartCountdown = true
      canSendNextQuestion = false
      canShowAnswer = false
      $currentGame.currentRound = response.data.round
      dispatch('change-step', { step: 2 })
      $showScore = false
    }
  }

  const showScoreMessage = () => {
    $socket.emit('show-score', { gameId: $currentGameId })
    dispatch('change-step', { step: 5 })
  }
</script>

<div class="p-2">
  <!-- Toolbar Header -->
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-bold text-center text-white mb-2">Quiz Controls</h2>
    </div>
    <!-- Current Round Indicator -->
    <div class="text-white">
      <span class="text-xl font-bold">Round:</span>
      {$currentGame.currentRound} / {$currentGame.rounds}
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap justify-between gap-4">
    <Button
      on:click={sendCountdownMessage}
      size="sm"
      color="blue"
      class="flex-1"
      disabled={isCountingDown || !canStartCountdown}
    >
      Start Countdown
    </Button>
    <Button
      on:click={sendShowAnswerMessage}
      size="sm"
      color="purple"
      class="flex-1"
      disabled={!canShowAnswer}
    >
      Show Answer
    </Button>
    <Button
      on:click={sendShowFirstMessage}
      size="sm"
      color="red"
      class="flex-1"
      disabled={!canShowScore}
    >
      Show First
    </Button>
    <Button
      on:click={sendNextQuestion}
      size="sm"
      color="green"
      class="flex-1"
      disabled={!canSendNextQuestion}
    >
      Next Question
    </Button>
    <Button
      on:click={showScoreMessage}
      size="sm"
      color="yellow"
      class="flex-1"
      disabled={!canShowScore}
    >
      Show Score
    </Button>
  </div>

  <!-- Countdown Timer -->
  <div class="mt-4 text-center">
    <p class="text-lg font-bold text-white">
      Countdown: <span>{timer}s</span>
      {#if !!$currentQuestion?.answer}
        <span class="float-right">Correct answer: {$currentQuestion.answer}</span>
      {/if}
    </p>
  </div>
</div>

<Modal bind:open={manualModeModalOpened} class="bg-gray-800">
  <ManualQuestionForm onSubmit={handleResponse} {sendDirectly} />
</Modal>
