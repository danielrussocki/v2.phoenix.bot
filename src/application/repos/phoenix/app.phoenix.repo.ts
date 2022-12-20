import mongoose, { Schema, model, Types, Model } from 'mongoose'
/* settings */
import { AppPhoenixSettings } from './app.phoenix.settings'
/* handlers */
import { AppDatabaseError, AppDatabaseOpen } from '@app/handlers/database'

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://${AppPhoenixSettings.username}:${AppPhoenixSettings.password}@${AppPhoenixSettings.server}/${AppPhoenixSettings.database}?retryWrites=true&w=majority`)

export const AppPhoenixRepo = mongoose.connection

AppPhoenixRepo.on('error', AppDatabaseError)
AppPhoenixRepo.on('open', AppDatabaseOpen)

export { Schema, model, Types, Model }