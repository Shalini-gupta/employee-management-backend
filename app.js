const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/employeeRoute');
const counterModel = require('./models/counterModel');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('combined'))
app.use(cors());

app.set('trust proxy', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const expressValidator = require('express-validator');

mongoose.connect(`mongodb://127.0.0.1:27017/test`, { useNewUrlParser: true }, (err, result) => {
    if (err) {
        console.log("Error in connecting with database")
    }
    else {
        console.log('Mongoose connecting is setup successfully')
    }
});


process.on('uncaughtException', function (err) {
    console.log(err);
})

//==========================Request Console=======================//

app.all("*", (req, resp, next) => {
    let obj = {
        Host: req.headers.host,
        ContentType: req.headers['content-type'],
        Url: req.originalUrl,
        Method: req.method,
        Query: req.query,
        Body: req.body,
        Parmas: req.params[0]
    }
    console.log("Common Request is===========>", [obj])
    next();
});

app.use(expressValidator())

app.use('/api/v1/employee', route);


app.listen(3000, () => {
    console.log(`App listening on port 3000`);
})

counterModel.findOne({}, (error, success) => {
    if (error) {
        console.log(error)
    } else {
        if (!success) {
            new counterModel({
                _id: "employeeId",
                sequenceValue: 0
            }).save((error, success) => {
                if (error) {
                    console.log("Error in creating counter");
                } else {
                    console.log("counter created successfully", success);
                }
            })
        }
    }
})