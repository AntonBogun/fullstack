const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(418, { 'Content-Type': 'text/plain' })
  response.end('I am a teapot')
})

const PORT = 3001
app.listen(PORT)
console.log(`Teapot running on port ${PORT}`)