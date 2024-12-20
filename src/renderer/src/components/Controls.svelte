<script lang="ts">
  import { Button } from 'flowbite-svelte';

  // State variables
  export let currentRound = 1; // Current round number
  export let totalRounds = 5; // Total number of rounds
  export let countdownTime = 5; // Countdown time in seconds

  let timer = countdownTime; // Timer state
  let isCountingDown = false; // Countdown active state
  let interval;

  // Start the countdown timer
  const startCountdown = () => {
    if (isCountingDown) return; // Prevent multiple countdowns
    isCountingDown = true;
    timer = countdownTime;
    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
      } else {
        stopCountdown();
      }
    }, 1000);
  };

  // Stop the countdown timer
  const stopCountdown = () => {
    clearInterval(interval);
    isCountingDown = false;
  };

  // Show the answer
  const showAnswer = () => {
    alert('Answer revealed!');
  };

  // Send the next question
  const nextQuestion = () => {
    if (currentRound < totalRounds) {
      currentRound++;
      stopCountdown(); // Stop the countdown for the next round
    } else {
      alert('Game over!');
    }
  };

  // Show the score
  const showScore = () => {
    alert('Displaying the score!');
  };
</script>

<div class="p-2">
  <!-- Toolbar Header -->
  <div class="flex justify-between items-center mb-4">
    <div>
      <h2 class="text-lg font-semibold text-white">Quiz Controls</h2>
      <p class="text-sm text-gray-500">Manage the game</p>
    </div>
    <!-- Current Round Indicator -->
    <div class="text-white">
      <span class="font-bold">Round:</span> {currentRound} / {totalRounds}
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap justify-between gap-4">
    <Button
      on:click={startCountdown}
      size="sm"
      color="blue"
      class="flex-1"
      disabled={isCountingDown}
    >
      Start Countdown
    </Button>
    <Button on:click={showAnswer} size="sm" color="purple" class="flex-1">
      Show Answer
    </Button>
    <Button on:click={nextQuestion} size="sm" color="green" class="flex-1">
      Next Question
    </Button>
    <Button on:click={showScore} size="sm" color="yellow" class="flex-1">
      Show Score
    </Button>
  </div>

  <!-- Countdown Timer -->
  <div class="mt-4 text-center">
    <p class="text-lg font-bold text-white">
      Countdown: <span>{timer}s</span>
    </p>
  </div>
</div>
