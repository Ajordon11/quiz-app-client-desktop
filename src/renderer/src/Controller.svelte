<script>
  import CreateGame from './components/CreateGame.svelte'
  import GameLayout from './components/GameLayout.svelte'
  import Alerts from './components/shared/Alerts.svelte'
  import StartGameLobby from './components/StartGameLobby.svelte'
  import Stepper from './components/Stepper.svelte';
  import { players, socket } from './stores/store'

  let steps = ['Create game', 'Start game', 'Start countdown', 'Show correct answer', 'Next question','Show score'];
  let currentStep = 0;

  window.electron.ipcRenderer.on('game-joined-reply', (_event, arg) => {
    console.log('game joined reply: ', arg);
    if (arg.active) {
      console.log('game is active')
      currentStep = 2
      return
    }
    currentStep = 1
  })

  $socket.on('answers-updated', (data) => {
    console.log('data from answers updated: ', data)
    $players = data
  })

  $socket.on('player-left', (data) => {
    console.log('data from player left: ', data)
    $players = $players.map(p => p.id === data ? {...p, connected: false} : p)
  })

  $socket.on('game-joined', (data) => {
    console.log('data from game joined: ', data)
    $players = Array.from(
      new Map(
        [...data.players, ...$players].map((p) => [p.id, {...p}])
      ).values()
    )
    console.log('after merge ', $players)
  })

  function nextStep(event) {
    console.log('next step event: ', event)
    currentStep = event.detail.step
  }

</script>

<div class="p-2 h-screen w-screen">
  <Alerts />
  <Stepper {steps} bind:currentStep />
  {#if currentStep === 0}
    <CreateGame/>
  {:else if currentStep === 1}
    <StartGameLobby on:next-step={() => currentStep = 2}/>
  {:else}
    <GameLayout on:change-step={(event) => nextStep(event)}/>
  {/if}
</div>
