<script lang="ts">
  import { ipcRenderer } from 'electron'
  import electronLogo from './assets/electron.svg'
  import Versions from './components/Versions.svelte'
  import { counter, socket } from './stores/store'

  $socket.on('game-joined', data => {
    console.log('game joined event: ', data);
  })

  ipcRenderer.on('game-joined', (_event, arg) => {
    console.log('game joined event from main: ', arg);
  })
</script>

<img alt="logo" class="logo" src={electronLogo} />
<div class="creator">This is display window</div>
<div class="text">
  Build an Electron app with
  <span class="svelte">Svelte</span>
  and
  <span class="ts">TypeScript</span>

  Counter: {$counter}
</div>
<Versions />
