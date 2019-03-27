const { movie } = require('./components/Movie')
// const app = require('express')()
// const http = require('http').Server(app)
// const io = require('socket.io')(http)

// app.get('/', (req, res) => res.send('Hello World!'))

// io.once('connection', (socket) => {
// 	console.log('a user connected')
// })

// http.listen(3000, () => console.log(`Example app listening on port 3000!`))

const io = require('socket.io')
const server = io.listen(3000)

server.on('connection', function(socket) {
	console.log('user connected')
	function returnResults(results) {
		socket.emit('results', results)
	}
	socket.on('search', (query) => {
		console.log(`searching ${query}`)
		movie.search(query).then((results) => returnResults(results))
	})
})
