import { logger } from './util.js'
import config from './config.js'
import { Controller } from './controller.js'

const { 
  location,
  pages: {
    homeHTML
  }
} = config

const controller = new Controller()

async function routes(request, response) {
  const { method, url } = request

  if(method === 'GET' && url === '/') {
    response.writeHead(302, {
      'Location': location.home
    })

    return response.end()
  }

  if(method === 'GET' && url === '/') {
    const { 
      stream
    } = await controller.getFileStream(homeHTML)

    return stream.pipe(response)
  }

  return response.end()
}

export function handler(request, response) {

  return routes(request, response)
  .catch(error => logger.error(`deu ruim: ${error.stack}`))
}