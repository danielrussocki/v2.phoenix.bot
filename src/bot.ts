import * as dotenv from 'dotenv'
import 'module-alias/register'
/* init env variables */
dotenv.config()

import { AppDiscordBot } from '@app/repos/discord'

AppDiscordBot.start()