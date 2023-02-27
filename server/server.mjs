import express from 'express'
import  Joke from "./joke.mjs"
import Dictionary from "../Dictionary_module/dictionary_module.mjs"

const server = express();
const port = (process.env.PORT || 8080);
const en_joke = new Joke(Dictionary.en.joke);
const no_joke = new Joke(Dictionary.no.joke);


server.set('port', port);
server.use(express.static('public'));

server.get("/joke/en", function(req,res,next){
    res.status(200).send("{\"joke\": \"" + en_joke.tellAJoke().toString() + "\"}").end();
})

server.get("/joke/no", function(req,res,next){
    res.status(200).send("{\"joke\": \"" + no_joke.tellAJoke().toString() + "\"}").end();
})


/* server.get("/", (req,res,next)=>{

res.status(200).send(joke).end();

});
 */


server.listen(server.get('port'), function () {
console.log('server running', server.get('port'));
});