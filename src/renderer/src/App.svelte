<script lang="ts">
  import { connected, currentGame, currentGameId, currentQuestion, players, showScore, socket } from './stores/store'
  import DisplayApp from './DisplayApp.svelte'
  import Controller from './Controller.svelte'
  import CustomSpeedDial from './components/shared/CustomSpeedDial.svelte'

  const isDisplayOnly = document.getElementById('display-window') !== null
  console.log('Is this display only? ', isDisplayOnly)

  $socket.on('connect', () => {
    console.log('Connected to server')
    $connected = true
  })

  $socket.on('next-question', (data) => {
    console.log('data from next question: ', data)
    $currentQuestion = data.question
    $currentGame.currentRound = data.round
    $showScore = false
  })

  $socket.on('game-started', (data) => {
    console.log('game started, ', data)
    $currentQuestion = data
  })

  $socket.on('game-deleted', () => {
    console.log('game deleted')
    $currentGame = null
    $currentGameId = null
    $currentQuestion = null
    $players = []
  })

  $socket.on('game-ended', (data) => {
    console.log('game ended, ', data)
    $currentGame = null
    $currentGameId = null
    $currentQuestion = null
    $players = []
  })
</script>

<div class="flex justify-center items-center w-full">
  {#if isDisplayOnly}
    <DisplayApp />
  {/if}

  {#if !isDisplayOnly}
    <Controller />
    <CustomSpeedDial />
  {/if}
</div>

<!-- TODO: Actions needed
  - (broadcast to all when controller is lost)
  - add loading for datasets and images - from and to server
  - add music samples
 -->
