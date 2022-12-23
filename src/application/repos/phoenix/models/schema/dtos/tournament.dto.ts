import { Types } from '../../../app.phoenix.repo'

export interface IUserTournament {
  _id?: Types.ObjectId
  id: string
  confirmed?: boolean
  points?: number
}

export interface ITournament {
  id: string
  title: string
  description: string
  users?: IUserTournament[]
  active?: boolean
}