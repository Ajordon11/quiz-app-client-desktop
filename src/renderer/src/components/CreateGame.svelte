<script lang="ts">
  import { A, Button, Input, Label, Tooltip } from 'flowbite-svelte'
  import CustomLabel from './shared/CustomLabel.svelte'
  import { currentGameId, socket, URL } from '../stores/store'
  import SelectExistingGameModal from './SelectExistingGameModal.svelte'
  import type { Game } from '../models/models'
  import { addAlert, clearAlerts } from '../stores/alerts'

  let name = 'Test game'
  let password = 'pass'
  let code = '1234'
  let rounds = 30
  let questionSet = 'data'

  let games: Game[] = []
  let openModal = false
  let loading = false

  const handleForm = (e) => {
    e.preventDefault()
    console.log('create game', name, password, code, rounds, questionSet)
    $socket.emit('game-create', { name, password, code, rounds, questionSet }, (response) => {
      console.log('Response from server on game create: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
      } else {
        clearAlerts()
        window.electron.ipcRenderer.send('game-joined', response.gameId)
        $currentGameId = response.gameId
      }
    })
  }

  const selectExistingGame = async () => {
    console.log('get active games')
    games = await getAllGames()
    console.log('available games: ', games)
    openModal = true
  }
  async function getAllGames() {
    loading = true
    const res = await fetch($URL + '/api/games')
    games = (await res.json()) as Game[]
    return games
  }
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <form class="flex flex-col space-y-6" on:submit={handleForm}>
    <CustomLabel>Create a new game</CustomLabel>
    <Label class="space-y-2 text-white">
      <span>Game name</span>
      <Input type="text" name="name" placeholder="Quiz of the year" required bind:value={name} />
    </Label>
    <Label class="space-y-2 text-white">
      <span>Game Code</span>
      <Input type="text" name="code" placeholder="X2rt4" required bind:value={code} />
    </Label>
    <Label class="space-y-2 text-white">
      <span>Game password</span>
      <Input type="password" name="password" placeholder="•••••" required bind:value={password} />
    </Label>
    <Tooltip>Used to recconect as host</Tooltip>
    <Label class="space-y-2 text-white">
      <span>Number of rounds</span>
      <Input type="number" name="rounds" placeholder="30" required bind:value={rounds} />
    </Label>
    <Label class="space-y-2 text-white">
      <span>Question set</span>
      <Input type="text" name="questions" placeholder="data" required bind:value={questionSet} />
    </Label>
    <Button type="submit" color="alternative" class="w-full" autofocus>Create game</Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Game already exists? <A
        class="text-primary-700 hover:underline dark:text-primary-500"
        on:click={selectExistingGame}
      >
        Join as host
      </A>
    </div>
  </form>
</div>

<SelectExistingGameModal {games} bind:openModal/>
