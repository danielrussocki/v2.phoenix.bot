import { model } from '../app.phoenix.repo'
import type { Document, CallbackWithoutResultAndOptionalError } from 'mongoose'
/* dependency models */
import { AppBetCounterModel } from './bet-counter.model'
/* schemas */
import { AppBetSchema } from './schema/bet.schema'

const autoInrementModelID = function(modelName: string, doc: Document, next: CallbackWithoutResultAndOptionalError) {
	AppBetCounterModel.findByIdAndUpdate(
		modelName,
		{ $inc: { seq: 1 } },
		{
			new: true,
			upsert: true,
		},
		function(error, contador) {
			if (error) return next(error)
			doc.id = contador.seq
			next()
		},
	)
}

AppBetSchema.pre('save', function(next) {
	if (!this.isNew) {
		next()
		return
	}
	autoInrementModelID('Bets', this, next)
})

export const AppBetModel = model('Bets', AppBetSchema)
