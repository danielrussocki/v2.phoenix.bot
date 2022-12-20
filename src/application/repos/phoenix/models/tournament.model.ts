import { model } from '../app.phoenix.repo'
/* schema */
import { AppTournamentSchema } from './schema/tournament.schema'

export const AppTournamentModel = model('Tournaments', AppTournamentSchema)
