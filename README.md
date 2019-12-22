# random-text-generator-js
With this generator you can generate random names and words that resemble anything you want. You can also generate custom lorem ipsums.

What the generator does is basically remembering what characters can come after another. While generating it creates and empty string and predicts new characters in a loop.

Throughout the documentation I will be saying that the generator generates `words` that are made out of `characters` but don't worry if you want to generate texts, just put words instead of characters and you will get sentences 😉.

- [Obtaining](#obtaining)
- [How does it work](#how-does-it-work)
- [Getting Started](#getting-started)
- [Functions](#functions)
	- [learnExample](#learn-example)
	- [learnExamples](#learn-examples)
	- [forgetExample](#forget-example)
	- [forgetExamples](#forget-examples)
	- [generate](#generate)
	- [lengthen](#lengthen)
	- [shrink](#shrink)

## Obtaining
### HTML
```html
<script src="https://raw.githubusercontent.com/Rafal-Majewski/random-text-generator-js/master/random_text_generator_browser.js"></script>
```

### node.js
```bash
npm install random-text-generator
```
```js
const createRandomTextGenerator=require("random-text-generator");
```

## Getting Started
```js
let settings={
	weights: {}, // Startings weights. Useful when loading the generator with precalculated weights.
	deepness: 40, // That many previous characters are used while determining a new character.
	trust: 2, // That many times a substring of characters must occur in order to be used while generating.
	limit: 400, // Maximal length (inclusive) that a generated word can reach. When reached the generator tries to generate the word again.
	splitter: "", // A character that doesn't occur in the splitted input. Basically use "" while generating words and " " while generating sentences.
	startingCharacter: String.fromCharCode(2), // A character that every word starts with. You don't include that in your input examples and it's not included in the generated output.
	endingCharacter: String.fromCharCode(3), // A character that every word ends with. You don't include that word in your input examples and it's not included in the generated output.
};
let randomTextGenerator=createRandomTextGenerator(settings);
```

## Functions
### learnExample
Teaches the generator a new word.
#### Syntax
```js
randomTextGenerator.learnExample(example, isRaw);
```
```example``` - **array** of **string**s
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.
#### Example
```js
randomTextGenerator.learnExample("Mark".split(""));
randomTextGenerator.learnExample("Henry".split(""));
randomTextGenerator.learnExample("Bob".split(""));
randomTextGenerator.learnExample("John".split(""));
randomTextGenerator.learnExample("David".split(""));

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.generate().join("");
	console.log(name);
}
// Mark
// Mavid
// Mavid
// Mark
// Job
// Mary
// Job
// Dark
// Dary
// Job
// Bob
// Bohnrk
```
### learnExamples
Runs [learnExample](#learn-example) for every given example.
#### Syntax
```js
randomTextGenerator.learnExamples(examples, isRaw);
```
```examples``` - **array** of **array** of **string**s
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.

### forgetExample
Makes the generator forget an example.
#### Syntax
```js
randomTextGenerator.forgetExample(example, isRaw);
```
```example``` - **array** of **string**s
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.
#### Example
```js
randomTextGenerator.learnExample("Dallas".split(""));
randomTextGenerator.learnExample("Austin".split(""));
randomTextGenerator.learnExample("Chicago".split(""));
randomTextGenerator.learnExample("Seattle".split(""));
randomTextGenerator.learnExample("Denver".split(""));
randomTextGenerator.learnExample("Boston".split(""));

for (let i=0; i<6; ++i) {
	let name=randomTextGenerator.generate().join("");
	console.log(name);
}
// Chin
// Chicaler
// Der
// Chinver
// Seagostin
// Das
randomTextGenerator.forgetExample("Dallas".split(""));
randomTextGenerator.forgetExample("Chicago".split(""));
randomTextGenerator.forgetExample("Denver".split(""));
for (let i=0; i<6; ++i) {
	let name=randomTextGenerator.generate().join("");
	console.log(name);
}
// Austin
// Boston
// Se
// Auston
// Bon
// Bostostostostoston
```