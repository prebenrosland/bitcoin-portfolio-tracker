
const JOKE_DELIMITER = "\n" 


class Joke{
    
    constructor(sourceJokes){
        this.jokes = [];
        if(sourceJokes){
            if(Array.isArray(sourceJokes)){
                this.jokes = sourceJokes;    
            } else if(typeof sourceJokes === "string" ){
                this.jokes = Joke.#extractJokesFromString(sourceJokes);
            }
        }
    }

    get numberOfJokes(){
        return this.jokes.length;
    }

    tellAJoke(){
        let joke = "Sorry, I am all out of laughs";
        if(this.jokes.length > 0){
            const jokeIndex = Math.floor(Math.random() * this.jokes.length-1) + 1 ;
            joke = this.jokes[jokeIndex];
        }
        return joke;
    }

    static #extractJokesFromString(source){
        const jokeArray = source.split(JOKE_DELIMITER);
        if(!Array.isArray(jokeArray) || jokeArray.length === 0){
            jokeArray = [];
        }
        return jokeArray;
    }

}


export { Joke as default, JOKE_DELIMITER };

