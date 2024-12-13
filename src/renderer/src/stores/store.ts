import { io, type Socket } from 'socket.io-client'
import { writable } from 'svelte/store'

export const counter = writable(0)
const url = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_DEV_SERVER_URL
export const URL = writable(url)
export const socket = writable<Socket>(io(url))
export const connected = writable(false)

export const currentGameId = writable<string | null>(null)
