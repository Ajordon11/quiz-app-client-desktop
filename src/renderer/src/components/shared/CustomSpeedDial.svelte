<script lang="ts">
  import { SpeedDial, SpeedDialButton } from "flowbite-svelte"
  import { CheckCircleSolid, TrashBinSolid, WindowRestoreSolid } from "flowbite-svelte-icons"
  import { currentGameId, socket } from "../../stores/store"

  const deleteGame = () => {
    $socket.emit('delete-game', { gameId: $currentGameId })
  }

  const endGame = () => {
    $socket.emit('end-game', { gameId: $currentGameId })
  }

</script>
<SpeedDial defaultClass="absolute start-3 bottom-3" pill={false} tooltip="none" color="light">
  <SpeedDialButton name="Display" on:click={() => window.electron.ipcRenderer.send('open-second-window')}>
    <WindowRestoreSolid class="w-6 h-6" />
  </SpeedDialButton>
  <SpeedDialButton name="Delete game" on:click={deleteGame}>
    <TrashBinSolid class="w-6 h-6" />
  </SpeedDialButton>
  <SpeedDialButton name="End game" on:click={endGame}>
    <CheckCircleSolid class="w-6 h-6" />
  </SpeedDialButton>
</SpeedDial>
