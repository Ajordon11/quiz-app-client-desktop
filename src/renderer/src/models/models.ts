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
  score?: number
}

export type AlertProps = {
  message: string
  title: string
  id?: number
  color?: any
  timeout?: number
  dismissable?: boolean
}
