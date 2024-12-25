<script lang="ts">
  import { Badge } from 'flowbite-svelte';
  import { players } from '../stores/store'

  // Sort players by score in descending order
  $: sortedPlayers = [...$players].sort((a, b) => b.score - a.score);
</script>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
  <!-- Header -->
  <h1 class="text-3xl font-bold mb-6">Leaderboard</h1>

  <!-- Player List -->
  <div class="w-full max-w-lg">
    <ul class="space-y-4">
      {#each sortedPlayers as player, index}
        <li
          class="p-4 bg-gray-800 rounded-lg shadow-md flex items-center justify-between"
        >
          <!-- Player Name and Rank -->
          <div>
            <p class="text-lg font-semibold">{player.name}</p>
            <p class="text-sm text-gray-400">Rank #{index + 1}</p>
          </div>

          <!-- Player Score -->
          <Badge color="purple" class="text-sm font-medium">
            {player.score} pts
          </Badge>
        </li>
      {/each}
    </ul>
  </div>
</div>
