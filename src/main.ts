import { app, BrowserWindow } from 'electron'
import { createLogger, format, transports } from 'winston'
import type {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports'
import * as path from 'path'

const getTransports = () => {
  const baseTransports: (FileTransportInstance | ConsoleTransportInstance)[] = [
    new transports.File({
      filename: `${app.getPath('appData')}/error.log`,
      level: 'error',
    }),
    new transports.File({ filename: `${app.getPath('appData')}/ssshh.log` }),
  ]

  if (process.env.NODE_ENV !== 'production') {
    baseTransports.push(
      new transports.Console({
        format: format.simple(),
      })
    )
  }

  return baseTransports
}

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'MainWindow' },
  transports: getTransports(),
})

const createWindow = () => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  logger.info('Main app has started')
})
