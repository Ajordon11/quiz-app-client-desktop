<script lang="ts">
  import { SpeedDial, SpeedDialButton } from "flowbite-svelte"
  import { WindowRestoreSolid } from "flowbite-svelte-icons"

</script>
<SpeedDial defaultClass="absolute end-6 bottom-6" pill={false} tooltip="none" textOutside color="light">
  <SpeedDialButton name="Display" on:click={() => window.electron.ipcRenderer.send('open-second-window')}>
    <WindowRestoreSolid class="w-6 h-6" />
  </SpeedDialButton>
</SpeedDial>
