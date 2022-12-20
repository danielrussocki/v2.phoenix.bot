import { Winston } from '@app/handlers/loggers/winston.logger'

export function AppDatabaseOpen() {
	Winston.log('info', 'we\'re connected')
}