import { Schema } from '../../app.phoenix.repo'
import { IVote } from './dtos/vote.dto'

export const AppVoteSchema = new Schema<IVote>({
	id: String,
	username: String,
	pollId: Number,
	answer: Number,
})