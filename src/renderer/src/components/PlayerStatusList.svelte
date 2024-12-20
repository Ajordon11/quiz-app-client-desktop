<script lang="ts">
  import { A, Badge } from 'flowbite-svelte'
  import { EditSolid } from 'flowbite-svelte-icons'

  // Array of player objects
  export let players = [
    {
      name: 'Alice',
      score: 10,
      lastAnswer: 'Paris',
      isConnected: true
    },
    {
      name: 'Bob',
      score: 8,
      lastAnswer: 'Berlin',
      isConnected: false
    },
    {
      name: 'Charlie',
      score: 152,
      lastAnswer: null,
      isConnected: true
    }
  ]

  // Sort players by score in descending order
  $: sortedPlayers = [...players].sort((a, b) => b.score - a.score)
</script>

<div class="p-2 min-h-screen">
  <!-- Header -->
  <h1 class="text-2xl font-bold text-center text-white mb-2">Player Status</h1>

  <!-- Player List -->
  <ul class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
    {#each sortedPlayers as player, index}
      <li
        class="p-1 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center border border-gray-700 bg-gray-800 relative"
      >
        <!-- Edit Button -->
        <div class="absolute top-0 right-0">
          <A class="text-white">
            <EditSolid class="w-4 h-4" />
          </A>
        </div>
        <!-- Player Standing -->
        <div class="flex items-center gap-2">
          <Badge class="text-sm font-medium text-white">#{index + 1}</Badge>
        </div>
        <!-- Player Info -->
        <div class="flex-1 mb-2 sm:mb-0">
          <p class="text-lg font-semibold text-white">{player.name}</p>
          <p class="text-sm text-gray-400">Answer: {player.lastAnswer ? player.lastAnswer : '---'}</p>
        </div>

        <!-- Player Score -->
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-400">Score:</p>
          <Badge class="text-sm font-medium text-white">{player.score}</Badge>
        </div>

        <!-- Connection Status -->
        <div class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-full {player.isConnected ? 'bg-green-500' : 'bg-red-500'}"
            title={player.isConnected ? 'Connected' : 'Disconnected'}
          ></div>
        </div>

      </li>
    {/each}
  </ul>
</div>
