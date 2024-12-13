<script lang="ts">
  import { connected, socket } from './stores/store'
  import DisplayApp from './DisplayApp.svelte'
  import Controller from './Controller.svelte'
  import CustomSpeedDial from './components/shared/CustomSpeedDial.svelte'

  // const openSecondWindow = (): void => window.electron.ipcRenderer.send('open-second-window')
  // const joinGame = (): void => window.electron.ipcRenderer.send('game-joined', { gameId: '12345'});
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

<!-- <img alt="logo" class="logo" src={electronLogo} />
<div class="creator">Powered by electron-vite</div>
<div class="text">
  Build an Electron app with
  <span class="svelte">Svelte</span>
  and
  <span class="ts">TypeScript</span>
</div>
<p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
<div class="actions">
  <div class="action"> -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
<!-- <a target="_blank" rel="noreferrer" on:click={openSecondWindow}>Open Second Window</a>
  </div>
  <div>
    Counter: {$counter}
  </div>
</div>
<Versions /> -->

<!-- TODO: Actions needed
- Create game (Name, password, rounds, questions) -> Modal
- Join display window to game
- Start game
- Next question
- Start coundown
- Show correct answer
- Show score

- Join game in progress as controller and existing player (broadcast to all when controller is lost)
 -->
