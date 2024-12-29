<script lang="ts">
  import {
    A,
    Accordion,
    AccordionItem,
    Button,
    ButtonGroup,
    DescriptionList,
    Helper,
    Input,
    InputAddon,
    Label,
    List,
    Modal
  } from 'flowbite-svelte'
  import { currentGame, currentGameId, currentQuestion, players, socket } from '../stores/store'
  import type { Game } from '../models/models'
  import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons'

  export let openModal = false
  export let games: Game[] = []

  let password: string
  let show = false
  let showError = false
  let errorMessage = ''

  const handleConnect = (gameId: string) => {
    console.log('Connect to game ', gameId, ' with password: ', password)
    $socket.emit('game-join-host', { gameId, password }, (response) => {
      console.log('Response from server on game join: ', response)
      if (!response.success) {
        showError = true
        errorMessage = response.message
        password = ''
      } else {
        showError = false
        $currentGame = response.game
        $currentGameId = response.game.id
        $players = response.game.players
        const isActive = response.game.status === 'IN_PROGRESS';
        if (isActive && !response.game.manualMode) {
          $currentQuestion = response.game.questionSet.questions[response.game.currentRound - 1]
        }
        window.electron.ipcRenderer.send('game-joined', { gameId: response.game.id, active: isActive })
        openModal = false
      }
    })
  }
</script>

<Modal
  bind:open={openModal}
  size="xs"
  autoclose={false}
  class="w-full"
  on:close={() => (openModal = false)}
>
  {#if games.length > 0}
    Select from existing games
    <Accordion>
      {#each games as game}
        <AccordionItem>
          <span slot="header">{game.name}</span>
          <List
            tag="dl"
            class="text-gray-900 dark:text-white divide-y divide-gray-200  dark:divide-gray-700"
          >
            <div class="flex flex-col pb-3">
              <DescriptionList tag="dt" class="mb-1">Game name</DescriptionList>
              <DescriptionList tag="dd">{game.name}</DescriptionList>
            </div>
            <div class="flex flex-col pb-3">
              <DescriptionList tag="dt" class="mb-1">Rounds</DescriptionList>
              {#if game.currentRound !== 0}
                <DescriptionList tag="dd">{game.currentRound}/{game.rounds}</DescriptionList>
              {:else}<DescriptionList tag="dd">{game.rounds}</DescriptionList>
              {/if}
            </div>
            <div class="flex flex-col pb-3">
              <DescriptionList tag="dt" class="mb-1">Status</DescriptionList>
              <DescriptionList tag="dd">{game.status}</DescriptionList>
            </div>
            <div class="flex flex-col pb-3">
              <DescriptionList tag="dt" class="mb-1">Questions</DescriptionList>
              <DescriptionList tag="dd">{game.questionSet}</DescriptionList>
            </div>
            <div class="flex flex-col pb-3">
              <DescriptionList tag="dt" class="mb-1">Created at</DescriptionList>
              <DescriptionList tag="dd">{game.createdAt}</DescriptionList>
            </div>
          </List>
          <div class="pt-8">
            <Label for="password" class="mb-2">Password</Label>
            <ButtonGroup class="w-full">
              <InputAddon>
                <A on:click={() => (show = !show)}>
                  {#if show}
                    <EyeOutline class="w-6 h-6" />
                  {:else}
                    <EyeSlashOutline class="w-6 h-6" />
                  {/if}
                </A>
              </InputAddon>
              <Input id="show-password" type={show ? 'text' : 'password'} bind:value={password}
              ></Input>
              <Button color="light" on:click={() => handleConnect(game.id)}>Connect</Button>
            </ButtonGroup>
            {#if showError}
              <Helper class="mt-2" color="red">{errorMessage}</Helper>
            {/if}
          </div>
        </AccordionItem>
      {/each}
    </Accordion>
  {:else}
    No games found
  {/if}
</Modal>
