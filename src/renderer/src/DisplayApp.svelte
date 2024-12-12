<script lang="ts">
  import electronLogo from './assets/electron.svg'
  import Versions from './components/Versions.svelte'
  import { socket } from './stores/store'

  $socket.on('game-joined', data => {
    console.log('game joined event: ', data);
  })

  window.electron.ipcRenderer.on('game-joined', (_event, arg) => {
    console.log('game joined event from main: ', arg);
  })
</script>

<div class="creator">This is display window</div>
<Versions />
