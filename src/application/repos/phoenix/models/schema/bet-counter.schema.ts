import { Schema } from '../../app.phoenix.repo'

export const AppBetCounterSchema = new Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 },
})