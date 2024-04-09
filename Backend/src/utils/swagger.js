const swaggerJsdoc = require('swagger-jsdoc')


//    .▄▄ · ▄▄▌ ▐ ▄▌ ▄▄▄·  ▄▄ •  ▄▄ • ▄▄▄ .▄▄▄  
//    ▐█ ▀. ██· █▌▐█▐█ ▀█ ▐█ ▀ ▪▐█ ▀ ▪▀▄.▀·▀▄ █·
//    ▄▀▀▀█▄██▪▐█▐▐▌▄█▀▀█ ▄█ ▀█▄▄█ ▀█▄▐▀▀▪▄▐▀▀▄ 
//    ▐█▄▪▐█▐█▌██▐█▌▐█ ▪▐▌▐█▄▪▐█▐█▄▪▐█▐█▄▄▌▐█•█▌
//    ▀▀▀▀  ▀▀▀▀ ▀▪ ▀  ▀ ·▀▀▀▀ ·▀▀▀▀  ▀▀▀ .▀  ▀


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bazarbunker REST API Docs",
            version: "1.0.0"
        },
        servers: [{
            url: 'http://localhost:9000'
        }]
    },
    apis: ['./src/routes*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec;