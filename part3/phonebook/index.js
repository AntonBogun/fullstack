const express = require('express');
const app = express();
app.use(express.json());
// const fs = require('fs');
// const util = require('util');

// const app = http.createServer((request, response) => {
//   response.writeHead(418, { 'Content-Type': 'text/plain' })
//   response.end('I am a teapot')
// })

const request_print = (req, res) => {
  if (req.url==="/favicon.ico"){
    console.log("favicon");
  }else{
    fs.appendFileSync('request.txt', util.inspect(req, {showHidden: false, depth: null})+'\n')
  }  
}

const persons=[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get("/info",(request,response)=>{
  // request_print(request, response);
  const n = persons.length
  const date = (new Date()).toString()
  const message = `<p>Phonebook has info for ${n} people.</p><p>${date}</p>`
  response.send(message)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const index=persons.findIndex(person=>person.id===id)
  if (index>-1){
    persons.splice(index,1)
  }
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!"name" in body || !"number" in body) {
    return response.status(400).json({ error: 'Name or number missing' })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(409).json({ error: 'Name must be unique' })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }
  persons.push(person)
  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
console.log(`Running on port ${PORT}`)})

