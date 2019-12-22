# random-text-generator-js
With this generator you can generate random names and words that resemble anything you want. You can also generate custom lorem ipsums.

What the generator does is basically remembering what characters can come after another. While generating it creates and empty string and predicts new characters in a loop.

Throughout the documentation I will be saying that the generator generates `words` that are made out of `characters` but don't worry if you want to generate texts, just put words instead of characters and you will get sentences ;).

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
elo
### learnExamples
kuppo
