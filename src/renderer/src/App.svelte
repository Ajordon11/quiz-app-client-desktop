<script lang="ts">
  import Versions from './components/Versions.svelte'
  import electronLogo from './assets/electron.svg'
  import { connected, counter, socket } from './stores/store'

  const openSecondWindow = (): void => window.Electron.ipcRenderer.send('open-second-window')
  // const joinGame = (): void => window.electron.ipcRenderer.send('game-joined', { gameId: '12345'});
  const isDisplayOnly = document.getElementById('display-window') !== null;
  console.log('Is this display only? ', isDisplayOnly)

  $socket.on('connect', () => {
    console.log('Connected to server')
    $connected = true
  })
</script>

{#if isDisplayOnly}
<div class="flex justify-center items-center">
  <h1>This is display window</h1>
  {$counter}
</div>
{/if}

{#if !isDisplayOnly}
<img alt="logo" class="logo" src={electronLogo} />
<div class="creator">Powered by electron-vite</div>
<div class="text">
  Build an Electron app with
  <span class="svelte">Svelte</span>
  and
  <span class="ts">TypeScript</span>
</div>
<p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
<div class="actions">
  <div class="action">
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
    <a target="_blank" rel="noreferrer" on:click={() => $counter++}>Increase count</a>
  </div>
  <div class="action">
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
    <a target="_blank" rel="noreferrer" on:click={openSecondWindow}>Open Second Window</a>
  </div>
  <div>
    Counter: {$counter}
  </div>
</div>
<Versions />
{/if}
