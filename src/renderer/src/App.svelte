<script lang="ts">
  import { connected, currentQuestion, questionActive, socket } from './stores/store'
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
    $currentQuestion = data
    $questionActive = true
  })

  $socket.on('game-started', (data) => {
    console.log('game started, ', data)
    $currentQuestion = data
    $questionActive = true
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
- DONE Create game (Name, password, rounds, questions) -> Modal
- DONE Join display window to game
- DONE Start game + DONE show connected players
- DONE Game controls - Next question -> Start coundown -> Show correct answer

- DONE Show progress - currently not showing for clients
- PARTIALLY DONE Show score (missing for display window)

- DONE Join game in progress as controller and existing player
  (broadcast to all when controller is lost)
- re-join game in progress as a player - NEEDS TESTING
  - add loading for datasets and images

  - show all questions for host (available from game-start)
  - test re-joining for host
  - NICE DISPLAY FOR DISPLAY WINDOW dammit
 -->
