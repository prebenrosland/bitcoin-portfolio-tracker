import express from 'express'
import userRouter from './routes/users.mjs'
import adminRouter from './routes/admin.mjs'
import transactionRouter from './routes/transactions.mjs'

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

server.use((req,res,next)=>{
    console.log(req.url);
    next();
})

server.use(express.json());

server.use('/users', userRouter);
server.use('/admin', adminRouter);
server.use('/transaction', transactionRouter);

server.listen(server.get('port'), function () {
console.log('server running', server.get('port'));
});