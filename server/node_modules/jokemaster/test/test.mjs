import Joke from "../joke.mjs"

const testJokesArray = ["Why is gravity everywhere? Because it is mass-produced"];
const testJokesArrayMultipleJokes = ["How many programmers does it take to change a light bulb? None – It’s a hardware problem", "Why is gravity everywhere? Because it is mass-produced"];
const testJokeString = "Why is gravity everywhere? Because it is mass-produced";
const testJokeStringMultipleJokes = "Why is gravity everywhere? Because it is mass-produced \n How many programmers does it take to change a light bulb? None – It’s a hardware problem";
const noJokesFalback = "Sorry, I am all out of laughs";


function testConstructorWithArray(){
    const jokeTeller = new Joke(testJokesArray);
    test(jokeTeller.tellAJoke() === testJokesArray[0], "Tell a joke from array source");
}

function testConstructorWithArrayMPJokes(){
    const jokeTeller = new Joke(testJokesArrayMultipleJokes);
    test(jokeTeller.numberOfJokes === testJokesArrayMultipleJokes.length, "Tell a joke from array source, multiple jokes");
}


function testConstructorWithString(){
    const jokeTeller = new Joke(testJokeString);
    test(jokeTeller.tellAJoke() === testJokeString, "Tell a joke from string source");    
}

function testConstructorWithStringMPJokes(){
    const jokeTeller = new Joke(testJokeStringMultipleJokes);
    test(jokeTeller.numberOfJokes === 2, "Tell a joke from string source, multiple jokes");
}

function testConstructorNoJokes(){
    const jokeTeller = new Joke();
    test(jokeTeller.tellAJoke() === noJokesFalback, "Unable to tell a joke");     
}

function test(test, description){
    if(test){
        console.log("🟢 " + description)
    } else{
        console.log("🔴 " + description);
    }
}

testConstructorNoJokes();
testConstructorWithArray();
testConstructorWithString();
testConstructorWithArrayMPJokes();
testConstructorWithStringMPJokes();







