import { io, type Socket } from 'socket.io-client'
import { writable } from 'svelte/store'
import type { Game, Player, Question } from '../models/models'

const url = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_DEV_SERVER_URL
export const URL = writable(url)
export const socket = writable<Socket>(io(url))
export const connected = writable(false)

export const currentGameId = writable<string | null>(null)
export const currentGame = writable<Game>()
export const currentQuestion = writable<Question | null>(null)
export const countdownTime = writable(5)
export const players = writable<Player[]>([])
export const showScore = writable(false)
