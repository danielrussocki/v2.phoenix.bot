import { Schema } from '../../app.phoenix.repo'
/* dtos */
import { IBet } from './dtos/bet.dto'

export const AppBetSchema = new Schema<IBet>({
	id: {
		type: Number,
		default: 0,
	},
	name: String,
	options: [String],
	description: String,
	winnerOption: String,
	active: {
		type: Boolean,
		default: true,
	},
})