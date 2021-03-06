/* global __SENTRY_TOKEN__, __DEVMODE__ */
import Raven from 'raven-js'

let isEnable = false
export const ANALYTICS_URL = `https://${__SENTRY_TOKEN__}@sentry.cozycloud.cc/2`

export const getConfig = () => ({
  shouldSendCallback: () => isEnable,
  environment: __DEVMODE__ ? 'development' : 'production'
})

export const configure = (enable) => {
  isEnable = enable
  Raven.config(ANALYTICS_URL, getConfig()).install()
}

export const logException = (err) => {
  return new Promise(resolve => {
    Raven.captureException(err)
    console.warn('Raven is recording exception')
    console.error(err)
    resolve()
  })
}

const logMessage = (message, level = 'info', force) => {
  return new Promise(resolve => {
    const updateConfig = force && !isEnable
    if (updateConfig) {
      configure(true)
    }
    Raven.captureMessage(message, {
      level
    })
    if (updateConfig) {
      configure(false)
    }
    resolve()
  })
}

export const logInfo = (message, force = false) => logMessage(message, 'info', force)
export const pingOnceADay = () => logInfo('good day: user opens the app')
