const fs = require("fs")
const http = require('http')

const file = fs.readFileSync('./Template/index.html', 'utf-8')

// Create Server
const server = http.createServer((request, response) => {
    response.end(file)
    console.log('Server wanna be starting something.')
})

// Start Server
server.listen(8000, '127.0.0.1', ()=> {
    console.log('Servers started something')
})