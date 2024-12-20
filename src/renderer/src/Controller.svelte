<script>
  import CreateGame from './components/CreateGame.svelte'
  import Alerts from './components/shared/Alerts.svelte'
  import StartGameLobby from './components/StartGameLobby.svelte'
  import Stepper from './components/Stepper.svelte';

  let steps = ['Create game', 'Start game', 'Start countdown', 'Show correct answer', 'Next question','Show score'];
  let currentStep = 0;

  window.electron.ipcRenderer.on('game-joined-reply', (_event, arg) => {
    console.log('game joined reply: ', arg);
    currentStep = 1
  })

</script>

<div class="p-6 h-screen w-screen">
  <Alerts />
  <Stepper {steps} bind:currentStep />
  {#if currentStep === 0}
    <CreateGame/>
  {:else if currentStep === 1}
    <StartGameLobby/>
  {:else if currentStep === 5}
    <slot name="show-score" />
  {:else}
    <slot name="game" />
  {/if}
</div>
