<script lang="ts">
  import electronLogo from './assets/electron.svg'
  import Versions from './components/Versions.svelte'
  import { counter } from './stores/store'
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
