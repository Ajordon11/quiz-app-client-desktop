<script lang="ts">
  import { socket } from './stores/store'

  window.electron.ipcRenderer.on('game-joined', (_event, arg) => {
    console.log('game joined event from main: ', arg);
  })
</script>

<div class="creator">This is display window</div>
