export type Game = {
  id: string
  name: string
  status: string
  rounds: number
  questionSet: string
  createdAt: Date
  players: number
  currentRound: number
}

export type Player = {
  id: string
  name: string
  connected: boolean
  score?: number
  lastAnswer?: string
}

export type AlertProps = {
  message: string
  title: string
  id?: number
  color?: any
  timeout?: number
  dismissable?: boolean
}

export type Question = {
  question: string
  type: string
  options: string[]
  image?: string
  answer?: string
  full_answer?: string
}
