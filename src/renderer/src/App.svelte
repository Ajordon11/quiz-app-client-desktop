<script lang="ts">
  import { connected, socket } from './stores/store'
  import DisplayApp from './DisplayApp.svelte'
  import Controller from './Controller.svelte'
  import CustomSpeedDial from './components/shared/CustomSpeedDial.svelte'

  const isDisplayOnly = document.getElementById('display-window') !== null
  console.log('Is this display only? ', isDisplayOnly)

  $socket.on('connect', () => {
    console.log('Connected to server')
    $connected = true
  })
</script>

<div class="flex justify-center items-center w-full">
  {#if isDisplayOnly}
    <DisplayApp />
  {/if}

  {#if !isDisplayOnly}
    <Controller />
    <CustomSpeedDial/>
  {/if}
</div>

<!-- TODO: Actions needed
- DONE Create game (Name, password, rounds, questions) -> Modal
- DONE Join display window to game
- Start game + show connected players
- Game controls - Next question -> Start coundown -> Show correct answer
- Show score

- DONE Join game in progress as controller and existing player
  (broadcast to all when controller is lost)
 -->
