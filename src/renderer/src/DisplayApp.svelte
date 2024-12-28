<script lang="ts">
  import FirstPlayerDisplay from './components/FirstPlayerDisplay.svelte'
  import PlayerScoreList from './components/PlayerScoreList.svelte'
  import QuestionDisplay from './components/QuestionDisplay.svelte'
  import ProgressBar from './components/shared/ProgressBar.svelte'
  import { addAlert } from './stores/alerts'
  import {
    currentGame,
    currentGameId,
    currentQuestion,
    githubUrl,
    players,
    showScore,
    socket
  } from './stores/store'

  let firstPlayerName = ''
  let showFirst = false
  let song = ''
  let audio: HTMLAudioElement = new Audio()

  window.electron.ipcRenderer.on('game-joined', (_event, arg) => {
    console.log('game joined event from main: ', arg)
    $socket.emit('game-join-display', { gameId: arg }, (response) => {
      console.log('Response from server on game join display: ', response)
      if (!response.success) {
        addAlert({ title: 'Error', message: response.message, color: 'red' })
        return
      }
      $currentGame = response.data
      $currentGameId = response.data.id
      $currentQuestion = response.data.questionSet.questions[response.data.currentRound - 1]
    })
  })
  $socket.on('show-score', (data) => {
    $showScore = true
    $players = data
  })

  $socket.on('show-first', (data) => {
    console.log('data from show first: ', data)
    showFirst = true
    firstPlayerName = data.name
    if (data.song) {
      song = `${$githubUrl}/audio/${data.song}.mp3`
      audio.src = song
      audio.load()
      setTimeout(() => {
        console.log('what is audio? ', audio)
        audio.play()
      })
    }
    setTimeout(() => {
      showFirst = false
    }, 5000)
  })
</script>

<audio bind:this={audio}></audio>
{#if $currentQuestion && !$showScore && !showFirst}
  <ProgressBar />
  <QuestionDisplay />
{:else if $showScore}
  <ProgressBar />
  <PlayerScoreList />
{:else if showFirst}
  <FirstPlayerDisplay {firstPlayerName} />
{:else}
  <!-- TODO Add loading animation or random gifs -->
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold text-white">Display</h1>
    <h2>Game ID: {$currentGameId}</h2>
    <p class="text-lg text-white">Waiting for game to start</p>
    <img
      src={$githubUrl +'/images/qr_code.png'}
      alt="https://quiz-app-client-qoo0.onrender.com/"
      class="w-52 h-52 m-10 rounded-md shadow-lg"
    />
  </div>
{/if}
