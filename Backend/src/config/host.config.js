const { config } = require("dotenv")
config();
module.exports = {
    hosts: {
        HOST202: process.env.HOST202,
        HOST303:  process.env.HOST303,
        LOCAL: process.env.LOCAL,
        LOCAL303: process.env.LOCAL303,
    }
}