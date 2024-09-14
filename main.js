const { app, BrowserWindow } = require('electron')
const { createLogger, format, transports } = require('winston')
const path = require('node:path')

const getTransports = () => {
  const baseTransports = [
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
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  logger.info('Main app has started')
})
