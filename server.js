const express = require('express');
const {engine} = require('express-handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes.js');
const authRouter = require('./routes/auth.routes.js');



module.exports = class Server {
    constructor(port = process.env.port || 8081){
        this.port = port
        this.app = express()
    }

    setup(){
        this.app.engine('.hbs', engine({extname: '.hbs'}));
        this.app.set('view engine', '.hbs');
        this.app.set('views', './views');
        this.app.use(express.static('views'));
        this.app.use(bodyParser.json());
        this.app.use(cors())

    }

    start(){
        this.setup();
        this.app.use('/user', userRouter);
        this.app.use('/user/auth', authRouter)
        this.app.listen(this.port, () => {
            console.log('Server started at port: ' + this.port);
        })
    }
}


