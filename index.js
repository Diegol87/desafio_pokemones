const axios = require('axios')
const http = require('http')
const fs = require('fs')

const server = http
    .createServer(async(req, res) => {
        if(req.url.includes('/pokemones')) {

            try {
                const { data } = await
                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`)

                const pokemones = data.results.map(async ( {url} ) => {
                    const { data } = await
                    axios
                        .get(url)
                        return { nombre: data.name, img: data.sprites.front_shiny }
                })

                const datos = await Promise.all(pokemones)
                res.writeHead(200, { 'Content-Type' : 'application/json' })
                return res.end(JSON.stringify(datos))

            } catch(error) {
                console.log('error')

            res.writeHead(500, { 'Content-Type' : 'application/json' })
            res.end(JSON. stringify({ error }))
            }
        }

        if(req.url.includes('/inicio')) {
            return fs.readFile('index.html', 'utf8', (err, html) => {
                if(err) return res.end('error al leer html')

                res.writeHead(200, { 'Content-Type' : 'text/html' })
                return res.end(html)
            })
        }
    
    })
    server.listen(8080, () => {
        console.log('Server ON')
    })