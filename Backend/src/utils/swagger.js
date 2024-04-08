const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { router } = require('../routes/indexRouter')

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
    apis: ["../routes/indexRouter.js"]
}

const swaggerSpec = swaggerJsdoc(options)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))