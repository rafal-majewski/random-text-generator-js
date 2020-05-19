# random-text-generator-js
Are you looking for a readme for the older version of the generator? If so you can find it [here](README_old.md), but support for this version is going to be removed in an upcoming update, so you should consider [upgrading](UPGRADING.md) it from version 2 to version 3.

With this generator you can generate names for:
- pets 🐶🐱🐮🐷
- planets 🌎
- your children 👶
- people 👩👨
- cities 🏘🏢
- lands 🏝⛰🗻
- Linux distributions 💻🐧
- and anything you want...<br/>
Moreover, you can generate custom Lorem Ipsums!

Play with it at [random-text-generator.firebaseapp.com](https://random-text-generator.firebaseapp.com/).

What the generator does is basically remembering what characters can come after another. While generating it creates and empty string and predicts new characters in a loop.

The generator does not use any kind of a neural network so don't expect the results to make any logical sense. They are statistically correct which makes them look natural. If you were looking for an intelligent random text generator you should use a neural network library like [brain.js](https://brain.js.org/).

Throughout the documentation I will be saying that the generator generates `words` that are made out of `characters` but don't worry, if you want to generate texts, just put words instead of characters and you will get sentences 😉.

Note: Generated words in some examples may look odd, that's because of not sufficient amout of learning data. The more learning data you provide the better the results.

## Table of contents
- [License](#License)
- [Obtaining](#obtaining)
- [Getting Started](#getting-started)
- [Functions](#functions)
	- [learn](#learn)
	- [learnRight](#learn-right)
	- [learnLeft](#learn-right)
	- [learnBoth](#learn-both)
	- [forget](#forget)
	- [forgetRight](#forget-right)
	- [forgetLeft](#forget-right)
	- [forgetBoth](#forget-both)


## License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>

## Obtaining
Note: The include syntax is temporary in order to provide legacy support. In the upcoming update it is going to change.

### HTML
```html
<script src="https://raw.githubusercontent.com/Rafal-Majewski/random-text-generator-js/master/random_text_generator_browser.js"></script>
```
```js
const RandomTextGenerator=createRandomTextGenerator({legacy: false});
```

### node.js
```bash
npm install random-text-generator
```
```js
const RandomTextGenerator=require("random-text-generator")({legacy: false});
```

## Getting Started
All the values shown in `settings` are the default values.
```js
// You can change the settings on the fly as well, just write randomTextGenerator.settingName=newValue.
let settings={
	tries: 80, // That many times the generator will try to generate. If exceeded the generator returns null.
	safeMode: true, // Safe mode makes the generation process faster, but makes the output a bit worse.
	forceCombiningOrigins: false, // Force the generator to combine origins. See examples for details on origins.
	minLength: 1, // Minimal length (inclusive) of output.
	maxLength: 400, // Maximal length (inclusive) of output.
	deepness: 40, // That many previous characters are used while determining a new character. The greater the generator is more intelligent, but needs more memory.
	trust: 2, // That many times a substring of characters must occur in order to be used while generating.
	weightsLeft: {} // Startings weights for generating right -> left.
	weightsRight: {} // Startings weights for generating left -> right.
	splitter: "", // A character that is use to split characters. Basically use "" while generating words and " " while generating sentences.
	startingCharacter: String.fromCharCode(2), // A character that every word starts with. You don't include that in your input examples and it's not included in the generated output.
	endingCharacter: String.fromCharCode(3), // A character that every word ends with. You don't include that word in your input examples and it's not included in the generated output.
};
// Initialize an instance of the generator with custom settings
let randomTextGenerator=new RandomTextGenerator(settings);
// Or initialize it with the default settings
let randomTextGenerator=new RandomTextGenerator();
```

## Functions
### learn
An alias for [learnRight](#learn-right).
### learnRight
Teaches the generator a new word (left -> right).
#### Syntax
```js
randomTextGenerator.learnRight(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.
#### Example
```js
randomTextGenerator.learnRight("Mark");
randomTextGenerator.learnRight("Henry");
randomTextGenerator.learnRight("Bob");
randomTextGenerator.learnRight("John");
randomTextGenerator.learn("David"); // learn is an alias for learnRight.
randomTextGenerator.learn("James");

for (let i=0; i<8; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}
// Jamen
// Mary
// Jark
// Job
// Bohn
// Dark
// John
// Jamen

// You can also provide starting letters
for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate("J");
	console.log(name);
}
// Job
// Jary
// Javid
// James
```

### learnLeft
Teaches the generator a new word (right -> left).
#### Syntax
```js
randomTextGenerator.learnLeft(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.
#### Example
```js
randomTextGenerator.learnLeft("Mark");
randomTextGenerator.learnLeft("Henry");
randomTextGenerator.learnLeft("Bob");
randomTextGenerator.learnLeft("John");
randomTextGenerator.learnLeft("David");
randomTextGenerator.learnLeft("James");

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft();
	console.log(name);
}
// David
// Henry
// Jark
// Bob

// All the names are going to end with "k"
for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft("k");
	console.log(name);
}
// Dark
// Bohnrk
// Henrk
// Jark

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft("y");
	console.log(name);
}
// Johnry
// Bohnry
// Jary
// Dary
```

### learnBoth
Calls both [learnRight](#learn-right) and [learnLeft](#learn-left).
#### Syntax
```js
randomTextGenerator.learnBoth(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.
#### Example
```js
randomTextGenerator.learnBoth("Mark");
randomTextGenerator.learnBoth("Henry");
randomTextGenerator.learnBoth("Bob");
randomTextGenerator.learnBoth("John");
randomTextGenerator.learnBoth("David");
randomTextGenerator.learnBoth("James");

// All the names are going to have "h" somewhere inside.
for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateBoth("h");
	console.log(name);
}
// Johnry
// Bohnry
// Bohnrk
// John

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateBoth("a");
	console.log(name);
}
// Mamen
// Mames
// David
// Mavid
```

### forget
An alias for [forgetRight](#forget-right).

### forgetRight
Unteaches the generator a word (left -> right).
#### Syntax
```js
randomTextGenerator.forgetRight(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.
#### Example
```js
randomTextGenerator.learn("Austin");
randomTextGenerator.learn("Seattle");
randomTextGenerator.learn("Seymour");
randomTextGenerator.learn("Washington");
randomTextGenerator.learn("Vancouver");
randomTextGenerator.learn("Dallas");
randomTextGenerator.learn("Detroit");
randomTextGenerator.learn("Denver");
randomTextGenerator.learn("Boston");
randomTextGenerator.learn("Beaumont");
randomTextGenerator.learn("Bozeman");

for (let i=0; i<6; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}
// Den
// Seymouver
// Bozemat
// Vas
// Bostingtleaur
// Seat

randomTextGenerator.forgetRight("Dallas");
randomTextGenerator.forgetRight("Detroit");
randomTextGenerator.forgetRight("Denver");
randomTextGenerator.forgetRight("Boston");
randomTextGenerator.forget("Beaumont"); // forget is an alias for forgetRight.
randomTextGenerator.forget("Bozeman");

for (let i=0; i<6; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}
// Seymour
// Auver
// Seastleasttleymon
// Vancouveymouver
// Seymon
// Watler
```

### forgetLeft
Unteaches the generator a word (right -> left).
#### Syntax
```js
randomTextGenerator.forgetLeft(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.

### forgetBoth
Calls both [forgetRight](#forget-right) and [forgetLeft](#forget-left).
#### Syntax
```js
randomTextGenerator.forgetBoth(example, origin, multiplier, isRaw);
```
- **example** - string or array of strings<br/>
- **origin** - *optional*, string, by default `"_default"`<br/>
Specifies the origin of a word.<br/>
- **multiplier** - *optional*, number, by default `1`<br/>
The importance of this example.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
<br/>

Returns nothing.

### predictCharacter
An alias for [predictCharacterRight](#predict-character-right).

### predictCharacterRight
Predicts the next character.
#### Syntax
```js
randomTextGenerator.predictRight(text, origins, isRaw, obeyLimit);
```
- **text** - string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsRight)`<br/>
Specifies the origins allowed in the generation process<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
- **obeyLimit** - *optional*, boolean, by default `false`<br/>
If `true` the generator obeys the minimal and maximal length boundaries while generating.<br/>
<br/>

Returns nothing.

#### Example
```js
randomTextGenerator.learn("Trump");
randomTextGenerator.learn("Obama");
randomTextGenerator.learn("Bush");
randomTextGenerator.learn("Clinton");
randomTextGenerator.learn("Reagan");
randomTextGenerator.learn("Carter");
randomTextGenerator.learn("Ford");
randomTextGenerator.learn("Nixon");
randomTextGenerator.learn("Johnson");
randomTextGenerator.learn("Kennedy");
randomTextGenerator.learn("Eisenhower");
randomTextGenerator.learn("Truman");
randomTextGenerator.learn("Roosevelt");
randomTextGenerator.learn("Hoover");
randomTextGenerator.learn("Coolidge");
randomTextGenerator.learn("Harding");

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictRight("H");
	console.log(character);
}
// a
// o
// a
// a

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictRight("Car");
	console.log(character);
}
// t
// d
// d
// t

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictRight("John");
	console.log(character);
}
// s
// t
// \3
// h
```

### predictLeft
Predicts the next character.
#### Syntax
```js
randomTextGenerator.predictLeft(text, origins, isRaw, obeyLimit);
```
- **text** - string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsLeft)`<br/>
Specifies the origins allowed in the generation process<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
- **obeyLimit** - *optional*, boolean, by default `false`<br/>
If `true` the generator obeys the minimal and maximal length boundaries while generating.<br/>
<br/>

Returns nothing.

#### Example
```js
randomTextGenerator.learnLeft("Trump");
randomTextGenerator.learnLeft("Obama");
randomTextGenerator.learnLeft("Bush");
randomTextGenerator.learnLeft("Clinton");
randomTextGenerator.learnLeft("Reagan");
randomTextGenerator.learnLeft("Carter");
randomTextGenerator.learnLeft("Ford");
randomTextGenerator.learnLeft("Nixon");
randomTextGenerator.learnLeft("Johnson");
randomTextGenerator.learnLeft("Kennedy");
randomTextGenerator.learnLeft("Eisenhower");
randomTextGenerator.learnLeft("Truman");
randomTextGenerator.learnLeft("Roosevelt");
randomTextGenerator.learnLeft("Hoover");
randomTextGenerator.learnLeft("Coolidge");
randomTextGenerator.learnLeft("Harding");

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictLeft("ng");
	console.log(character);
}
// o
// h
// e
// o

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictLeft("n");
	console.log(character);
}
// a
// o
// o
// o

for (let i=0; i<4; ++i) {
	let character=randomTextGenerator.predictLeft("hower");
	console.log(character);
}
// s
// n
// n
// n
```