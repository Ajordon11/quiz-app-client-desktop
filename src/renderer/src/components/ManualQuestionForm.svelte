<script lang="ts">
  import { Button, Input, Textarea, Select, Label } from 'flowbite-svelte'
  import { currentGameId, nextManualQuestion, socket } from '../stores/store'
  import { addAlert, clearAlerts } from '../stores/alerts'

  export let onSubmit
  export let sendDirectly

  let question = ''
  let type = 'MULTIPLE_CHOICE'
  let options = []
  let answer = ''
  let fullAnswer = null
  let image = null

  const sendQuestion = (question) => {
    console.log('Sending question: ', question, sendDirectly)
    if (options.length === 0) {
      question.options = null
    }
    if (question.type === 'ORDER') {
      question.answer = question.options.join(',')
      shuffleArray(question.options)
    } else if (question.type === 'LETTER') {
      question.answer = answer.toUpperCase()[0]
    }
    console.log('what the fuck is sendDirectly ' + sendDirectly, sendDirectly === false)
    if (sendDirectly === false) {
      console.log('not sending directly')
      $nextManualQuestion = question
      return
    } else {
      $socket.emit('next-round-manual', { gameId: $currentGameId, ...question }, (response) => {
        console.log('Response from server on next round manual1: ', response)
        if (!response.success) {
          addAlert({ title: 'Error', message: response.message, color: 'red' })
        } else {
          clearAlerts()
          onSubmit(response)
        }
      })
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  const addOption = () => {
    options = [...options, '']
  }

  // Show/hide options input based on question type
  $: showOptions = type === 'MULTIPLE_CHOICE' || type === 'ORDER'
  $: mappedOptions = options.map((option) => ({ value: option, name: option }))
</script>

<div class="p-4 bg-gray-800 text-white w-full">
  <h2 class="text-2xl font-bold mb-4">Vytvoriť otázku</h2>
  <form
    on:submit|preventDefault={() => {
      sendQuestion({ question, type, options, answer, fullAnswer, image })
    }}
    class="space-y-4"
  >
    <!-- Question Text -->
    <Input
      id="question"
      bind:value={question}
      type="text"
      placeholder="Zadajte text otázky"
      required
      class="text-black"
    />

    <!-- Question Type -->
    <Select id="type" bind:value={type} placeholder="Typ otázky" required class="text-black">
      <option value="MULTIPLE_CHOICE">Viacnásobná voľba</option>
      <option value="LETTER">Písmeno</option>
      <option value="NUMBER">Číslo</option>
      <option value="ORDER">Poradie</option>
    </Select>

    <!-- Options -->
    {#if showOptions}
      <div>
        <Label class="block mb-2 text-sm font-medium text-white">Možnosti</Label>
        <div class="space-y-2">
          {#each options as _option, index}
            <div class="flex items-center space-x-2">
              <Input
                class="flex-grow text-black"
                placeholder={`Možnosť ${index + 1}`}
                bind:value={options[index]}
              />
              <Button
                size="xs"
                color="red"
                on:click={() =>
                  (options = [...options.slice(0, index), ...options.slice(index + 1)])}
              >
                Odstrániť
              </Button>
            </div>
          {/each}
        </div>
        <Button size="sm" color="green" class="mt-2" on:click={() => addOption()}>
          Pridať možnosť
        </Button>
      </div>
    {/if}

    <!-- Correct Answer -->
    {#if type === 'ORDER'}
      <span>Zadajte možnosti v správnom poradí, neskôr budú náhodne zamiešané</span>
    {:else if type === 'MULTIPLE_CHOICE'}
      <Select
        id="answer"
        bind:value={answer}
        items={mappedOptions}
        placeholder="Vyberte správnu možnost"
        required
        class="text-black"
      />
    {:else}
      <Input
        id="answer"
        bind:value={answer}
        type={type === 'LETTER' ? 'text' : 'number'}
        placeholder="Zadajte správnu odpoveď"
        required
        class="text-black"
      />
    {/if}

    <!-- Full Answer -->
    <Textarea
      id="fullAnswer"
      bind:value={fullAnswer}
      label="Doplňujúca odpoveď"
      placeholder="Zadajte doplňujúcu informáciu k odpovedi (nepovinné)"
      rows="3"
      class="text-black"
    />

    <!-- Image -->
    <Input
      id="image"
      type="text"
      bind:value={image}
      placeholder="Zadajte meno obrazku (nepovinné)"
      class="text-black"
    />

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button type="submit" color="primary">Odoslať otázku</Button>
    </div>
  </form>
</div>
