const express = require('express')
const app = express()
const PORT = 3000
const CLIENTS = require('./data/clients')

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/api', (req, res) => {
  res.send('API de clientes')
})

app.get('/api/client', (req, res) => {
  res.json(CLIENTS.map(c => {
    return {
      id: c.id, 
      name: c.name,
      surname: c.surname,
      email: c.account.email
    }
  }))
})
app.get('/api/client/:id', (req, res) => {
  const id = req.params.id
  let filterClient = CLIENTS.filter(c => c.id == id)
  if (filterClient.length) {
    res.json(filterClient[0])
  } else {
    res.send('El cliente con id = ' + id + ' no encontrado')
  }
})

app.use(express.static('public'))

app.listen(PORT, () => {
  console.log('El servidor está escuchando en el puerto ' + PORT)
})