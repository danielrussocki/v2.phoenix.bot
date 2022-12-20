import { Winston } from '@app/handlers/loggers/winston.logger'

export function AppDatabaseError(e: unknown) {
	Winston.error(e)
}
