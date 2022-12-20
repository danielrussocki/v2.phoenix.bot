import { model } from '../app.phoenix.repo'
/* schemas */
import { AppBetCounterSchema } from './schema/bet-counter.schema'

AppBetCounterSchema.index({ _id: 1, seq: 1 }, { unique: true })

export const AppBetCounterModel = model('BetCounter', AppBetCounterSchema)
