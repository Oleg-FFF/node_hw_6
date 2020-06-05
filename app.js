const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const { authRouter, userRouter, productRouter } = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/product', productRouter);



const db = require('./dataBase').getInstance();
db.setModels();

app.use('*', (err, req, res, next) => {
    let message = err.message

    if (err.parent) {
        message = err.parent.sqlMessage
    }
    res
        .status(err.status || 400)
        .json({
            message,
            code: err.customCode
        })
})

app.listen(4400, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 4400...');
    }
})

// process.on("unhandledRejection", reason => {
//     console.log('_______________________');
//     console.log(reason);
//     console.log('_______________________');
//
//     process.exit(0)
// })
