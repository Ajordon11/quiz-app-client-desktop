<script lang="ts">
  import PlayerScoreList from './components/PlayerScoreList.svelte'
  import QuestionDisplay from './components/QuestionDisplay.svelte'
  import ProgressBar from './components/shared/ProgressBar.svelte'
  import { addAlert } from './stores/alerts'
  import {
    currentGame,
    currentGameId,
    currentQuestion,
    players,
    showScore,
    socket
  } from './stores/store'

  window.electron.ipcRenderer.on('game-joined', (_event, arg) => {
    console.log('game joined event from main: ', arg)
    $socket.emit('game-join-display', { gameId: arg }, (response) => {
      console.log('Response from server on game join display: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
        return
      }
      $currentGame = response.data
      $currentGameId = response.data.id
      $currentQuestion = response.data.questionSet.questions[response.data.currentRound - 1]
    })
  })
  $socket.on('show-score', (data) => {
    $showScore = true
    $players = data
  })
</script>

{#if $currentQuestion && !$showScore}
  <ProgressBar />
  <QuestionDisplay />
{:else if $showScore}
  <ProgressBar />
  <PlayerScoreList />
{:else}
  <!-- TODO Add loading animation or random gifs -->
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold text-white">Display</h1>
    <h2>Game ID: {$currentGameId}</h2>
    <p class="text-lg text-white">Waiting for game to start</p>
  </div>
{/if}
