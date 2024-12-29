<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import { addAlert, clearAlerts } from '../stores/alerts'
  import { currentGame, currentGameId, currentQuestion, players, socket } from '../stores/store'
  import { PlaySolid } from 'flowbite-svelte-icons'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function removePlayer(id: string): void {
    $socket.emit('remove-player', { playerId: id, gameId: $currentGameId }, (response) => {
      console.log('Response from server on remove player: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
      } else {
        clearAlerts()
        $players = response.data
      }
    })
  }

  const startGame = () => {
    $socket.emit('game-start', { gameId: $currentGameId }, (response) => {
      console.log('Response from server on start game: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
      } else {
        clearAlerts()
        $currentGame = response.game
        if (!response.game.manualMode) {
          $currentQuestion = response.question
        }
        dispatch('next-step')
      }
    })
  }
</script>

<div class="p-4 min-h-screen">
  <div class="mb-4 flex justify-center items-center">
    <Button size="xl" on:click={startGame} color="green" class="w-96"><PlaySolid class="w-6 h-6 me-2" />Start Game</Button>
  </div>
  <h1 class="text-2xl font-bold text-center text-primary mb-4">Player List</h1>

  {#if $players.length > 0}
    <!-- Player List -->
    <ul class="space-y-3">
      {#each $players as player, index}
        <li
          class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200"
        >
          <!-- Player Info -->
          <div class="flex items-center space-x-4">
            <!-- Player Avatar -->
            <div
              class="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold rounded-full"
            >
              {index + 1}
            </div>
            <!-- Player Name -->
            <div>
              <p class="text-lg font-semibold text-gray-800">{player.name}</p>
              <p class="text-sm text-gray-500">Score: {player.score || '0'}</p>
            </div>
          </div>

          <!-- Action Buttons (Optional) -->
          <div class="flex space-x-2">
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full {player.connected !== false ? 'bg-green-500' : 'bg-red-500'}"
                title={player.connected !== false ? 'Connected' : 'Disconnected'}
              ></div>
            </div>
            <button
              class="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              on:click={() => removePlayer(player.id)}
            >
              Remove
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <!-- Empty State -->
    <p class="text-center text-gray-500 mt-10">No players found. Wait until they join the game</p>
  {/if}
</div>
