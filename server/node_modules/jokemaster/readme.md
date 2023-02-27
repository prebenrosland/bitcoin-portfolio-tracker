# About

This repository is a simple demonstration of how to construct a Javascript module for multiple projects. Our primary concern is encapsulation and separation of concerns, secondly documenting our work in the readme file, but also with tests. 

# Joke Telling module.

## Why
There is a need for a better way of telling jokes in software. This module makes it simple to get a new random joke served in any project. Note that jokes are sold separately. 

## Usage
```javascript
import Joke from "joke.mjs"

const joke = new Joke(/*Joke list as array or \n seperated list*/);
console.log(`The joke teller knows ${joke.numberOfJokes}`)
console.log(joke.tellAJoke());

```


