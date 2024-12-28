<script lang="ts">
  import { A, Badge } from 'flowbite-svelte'
  import { CheckCircleSolid, EditSolid } from 'flowbite-svelte-icons'
  import { currentGameId, players, socket } from '../stores/store'
  import { addAlert } from '../stores/alerts'

  let editting = false
  let newScoreValue = 0

  function editPlayer(player) {
    console.log('edit player: ', player)
    editting = true
    newScoreValue = player.score
  }

  function saveEdit(player) {
    editting = false
    $socket.emit('edit-player-score', { playerId: player.id, score: newScoreValue, gameId: $currentGameId }, (response) => {
      console.log('Response from server on edit player score: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
      } else {
        $players = response.data
      }
    })
  }

  // Sort players by score in descending order
  $: sortedPlayers = [...$players].sort((a, b) => b.score - a.score)
</script>

<div class="p-2 min-h-screen">
  <!-- Header -->
  <h1 class="text-2xl font-bold text-center text-white mb-2">Player Status</h1>

  <!-- Player List -->
  <ul class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
    {#each sortedPlayers as player, index}
      <li
        class="p-1 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center border border-gray-700 bg-gray-800 relative"
      >
        <!-- Edit Button -->
        <div class="absolute top-0 right-0">
          {#if editting}
            <A class="text-white" on:click={() => {saveEdit(player)}}>
              <CheckCircleSolid class="w-4 h-4" />
            </A>
          {:else}
          <A class="text-white" on:click={() => {editPlayer(player)}}>
            <EditSolid class="w-4 h-4" />
          </A>
          {/if}
        </div>
        <!-- Player Standing -->
        <div class="flex items-center gap-2">
          <Badge class="text-sm font-medium text-white">#{index + 1}</Badge>
        </div>
        <!-- Player Info -->
        <div class="flex-1 mb-2 sm:mb-0">
          <p class="text-lg font-semibold text-white">{player.name}</p>
          <p class="text-sm text-gray-400 truncate ... max-w-44">
            A: {player.lastAnswer !== '' ? player.lastAnswer : '---'}
          </p>
        </div>

        <!-- Player Score -->
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-400">Score:</p>
          {#if !editting}<Badge class="text-sm font-medium text-white">{player.score}</Badge>
          {:else}
            <input
              type="number"
              bind:value={newScoreValue}
              class="bg-gray-700 text-white border border-gray-600 rounded-md px-2 py-1"
            />
          {/if}
        </div>

        <!-- Connection Status -->
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-full {player.connected !== false
              ? 'bg-green-500'
              : 'bg-red-500'}"
            title={player.connected !== false ? 'Connected' : 'Disconnected'}
          ></div>
        </div>
      </li>
    {/each}
  </ul>
</div>
