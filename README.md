# random-text-generator-js
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

The generator **does not** use any kind of a neural network so don't expect the results to make any logical sense. They are statistically correct which makes them look natural. If you were looking for an intelligent random text generator you should use a neural network library like [brain.js](#https://brain.js.org/).

Throughout the documentation I will be saying that the generator generates `words` that are made out of `characters` but don't worry if you want to generate texts, just put words instead of characters and you will get sentences 😉.

Note: Generated words in some examples may look odd, that's because of not sufficient amout of learning data. The more learning data you provide the better the results.

- [License](#License)
- [Obtaining](#obtaining)
- [Getting Started](#getting-started)
- [Functions](#functions)
	- [learnExample](#learn-example)
	- [learnExamples](#learn-examples)
	- [forgetExample](#forget-example)
	- [forgetExamples](#forget-examples)
	- [generate](#generate)
	- [lengthen](#lengthen)
	- [predictCharacter](#predict-character)
	- [shrink](#shrink)
	- [saveToJson](#save-to-json)
	- [loadFromJson](#load-from-json)
	- [saveWeightsToJson](#save-weights-to-json)
	- [loadWeightsFromJson](#load-weights-from-json)
- [Examples](#examples)
	- [Generating Words](#examples-words)
		- [Usernames](#examples-usernames)
	- [Generating Texts](#examples-texts)
		- [English Lorem Ipsum](#english-lorem-ipsum)
- [Data](#data)

## License
Do what you want.

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
All the values shown in `settings` are the default values.
```js
let settings={
	weights: {}, // Startings weights. Useful when loading the generator with precalculated weights.
	tries: 80, // That many times the generator will try to generate. If exceeded the generator returns null.
	deepness: 40, // That many previous characters are used while determining a new character. The more the generator is more intelligent.
	trust: 2, // That many times a substring of characters must occur in order to be used while generating. The more the results are uniquer.
	limit: 400, // Maximal length (inclusive) that a generated word can reach. When reached the generator tries to generate the word again.
	splitter: "", // A character that doesn't occur in the splitted input. Basically use "" while generating words and " " while generating sentences.
	startingCharacter: String.fromCharCode(2), // A character that every word starts with. You don't include that in your input examples and it's not included in the generated output.
	endingCharacter: String.fromCharCode(3), // A character that every word ends with. You don't include that word in your input examples and it's not included in the generated output.
};
// Initialize an instance of the generator with custom settings
let randomTextGenerator=createRandomTextGenerator(settings);
// Or initialize it with the default settings
let randomTextGenerator=createRandomTextGenerator();
```

## Functions
### learnExample
Teaches the generator a new word.
#### Syntax
```js
randomTextGenerator.learnExample(example, isRaw);
```
```example``` - **array** of **string**s.<br/>
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.<br/>
Returns **nothing**.
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
```examples``` - **array** of **array** of **string**s<br/>
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.
Returns **nothing**.

### forgetExample
Makes the generator forget an example.
#### Syntax
```js
randomTextGenerator.forgetExample(example, isRaw);
```
```example``` - **array** of **string**s.<br/>
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.<br/>
Returns **nothing**.
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

###  forgetExamples
Runs [forgetExample](#forget-example) for every given example.
#### Syntax
```js
randomTextGenerator.forgetExamples(examples, isRaw);
```
```examples``` - **array** of **array** of **string**s.<br/>
```isRaw``` - *optional*, **boolean**, by default `false`. If `true` the input is not treated like a word, but like a part of a word.<br/>
Returns **nothing**.

### generate
Generates a word.
#### Syntax
```js
randomTextGenerator.generate();
```
Returns **array** of **string**s.
#### Example
```js
let presidents=["Trmup", "Obama", "Bush", "Clinton", "Bush", "Reagan", "Carter"];
for (let president of presidents) randomTextGenerator.learnExample(president.split(""));

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.generate().join("");
	console.log(name);
}
// Rea
// Canteamush
// Trmup
// Rerton
// Reagan
// Bush
// Tr
// Obantonton
// Clin
// Rea
// Obagamagamarmaga
// Clin
```

### lengthen
Similar to [generate](#generate), but you can set the beginning.
#### Syntax
```js
randomTextGenerator.lengthen(splittedWord);
```
```splittedWord``` - **array** of **string**s<br/>
Returns **array** of **string**s.
#### Example
```js
let presidents=["Trmup", "Obama", "Bush", "Clinton", "Bush", "Reagan", "Carter"];
for (let president of presidents) randomTextGenerator.learnExample(president.split(""));

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.lengthen("Ob".split("")).join("");
	console.log(name);
}
// Oban
// Obar
// Obartermush
// Obanton
// Obarmamush
// Oban
// Oban
// Obar
// Obama
// Obamagar
// Oban
// Obagagarton
```

### predictCharacter
Similar to [lengthen](#lengthen), but gives you only the next predicted character.
#### Syntax
```js
randomTextGenerator.predictCharacter(splittedWord);
```
```splittedWord``` - **array** of **string**s<br/>
Returns **string**.
#### Example
```js
let presidents=["Trmup", "Obama", "Bush", "Clinton", "Bush", "Reagan", "Carter"];
for (let president of presidents) randomTextGenerator.learnExample(president.split(""));

for (let i=0; i<10; ++i) {
	let character=randomTextGenerator.predict("Oba".split(""));
	console.log(character);
}
// n
// m
// m
// r
// m
// r
// n
//  (Default end of a word character)
// r
// n
```

### shrink
Reduces the size of the generator's weights by removing saved substrings that have less occurrences than the `trust` value. May cause negative effects when the dataset the generator used for learning is small, so use it only when neccessary.
#### Syntax
```js
randomTextGenerator.shrink();
```
Returns **nothing**.
#### Example
```js
let pets=["Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon"];
for (let pet of pets) randomTextGenerator.learnExample(pet.split(""));

console.log(randomTextGenerator.saveWeightsToJson());
// {"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"\u0002Da":{"i":1},"\u0002Dai":{"s":1},"\u0002Dais":{"y":1},"\u0002Daisy":{"\u0003":1},"D":{"a":1,"u":1},"Da":{"i":1},"Dai":{"s":1},"Dais":{"y":1},"Daisy":{"\u0003":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"ais":{"y":1},"aisy":{"\u0003":1},"i":{"s":1,"l":1,"t":1,"m":1},"is":{"y":1},"isy":{"\u0003":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"sy":{"\u0003":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"\u0002Cl":{"e":1},"\u0002Cle":{"o":1},"\u0002Cleo":{"\u0003":1},"C":{"l":1,"h":1,"a":1},"Cl":{"e":1},"Cle":{"o":1},"Cleo":{"\u0003":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"leo":{"\u0003":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"eo":{"\u0003":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"\u0002Ch":{"l":1},"\u0002Chl":{"o":1},"\u0002Chlo":{"e":1},"\u0002Chloe":{"\u0003":1},"Ch":{"l":1},"Chl":{"o":1},"Chlo":{"e":1},"Chloe":{"\u0003":1},"h":{"l":1},"hl":{"o":1},"hlo":{"e":1},"hloe":{"\u0003":1},"lo":{"e":1},"loe":{"\u0003":1},"oe":{"\u0003":1},"\u0002A":{"n":1},"\u0002An":{"g":1},"\u0002Ang":{"e":1},"\u0002Ange":{"l":1},"\u0002Angel":{"\u0003":1},"A":{"n":1},"An":{"g":1},"Ang":{"e":1},"Ange":{"l":1},"Angel":{"\u0003":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"ng":{"e":1},"nge":{"l":1},"ngel":{"\u0003":1},"g":{"e":1},"ge":{"l":1},"gel":{"\u0003":1},"el":{"\u0003":1},"\u0002Du":{"s":1},"\u0002Dus":{"t":1},"\u0002Dust":{"y":1},"\u0002Dusty":{"\u0003":1},"Du":{"s":1},"Dus":{"t":1},"Dust":{"y":1},"Dusty":{"\u0003":1},"u":{"s":1},"us":{"t":1},"ust":{"y":1},"usty":{"\u0003":1},"st":{"y":1},"sty":{"\u0003":1},"t":{"y":1,"t":1,"e":1},"ty":{"\u0003":1},"\u0002B":{"a":1},"\u0002Ba":{"i":1},"\u0002Bai":{"l":1},"\u0002Bail":{"e":1},"\u0002Baile":{"y":1},"\u0002Bailey":{"\u0003":1},"B":{"a":1},"Ba":{"i":1},"Bai":{"l":1},"Bail":{"e":1},"Baile":{"y":1},"Bailey":{"\u0003":1},"ail":{"e":1},"aile":{"y":1},"ailey":{"\u0003":1},"il":{"e":1},"ile":{"y":1},"iley":{"\u0003":1},"ley":{"\u0003":1},"ey":{"\u0003":2},"\u0002M":{"i":1},"\u0002Mi":{"t":1},"\u0002Mit":{"t":1},"\u0002Mitt":{"e":1},"\u0002Mitte":{"n":1},"\u0002Mitten":{"s":1},"\u0002Mittens":{"\u0003":1},"M":{"i":1},"Mi":{"t":1},"Mit":{"t":1},"Mitt":{"e":1},"Mitte":{"n":1},"Mitten":{"s":1},"Mittens":{"\u0003":1},"it":{"t":1},"itt":{"e":1},"itte":{"n":1},"itten":{"s":1},"ittens":{"\u0003":1},"tt":{"e":1},"tte":{"n":1},"tten":{"s":1},"ttens":{"\u0003":1},"te":{"n":1},"ten":{"s":1},"tens":{"\u0003":1},"en":{"s":1},"ens":{"\u0003":1},"ns":{"\u0003":1},"\u0002Ca":{"s":1},"\u0002Cas":{"e":1},"\u0002Case":{"y":1},"\u0002Casey":{"\u0003":1},"Ca":{"s":1},"Cas":{"e":1},"Case":{"y":1},"Casey":{"\u0003":1},"as":{"e":1},"ase":{"y":1},"asey":{"\u0003":1},"se":{"y":1},"sey":{"\u0003":1},"\u0002S":{"o":1,"n":1,"i":1},"\u0002So":{"c":1},"\u0002Soc":{"k":1},"\u0002Sock":{"s":1},"\u0002Socks":{"\u0003":1},"S":{"o":1,"n":1,"i":1},"So":{"c":1},"Soc":{"k":1},"Sock":{"s":1},"Socks":{"\u0003":1},"oc":{"k":1},"ock":{"s":1},"ocks":{"\u0003":1},"c":{"k":1},"ck":{"s":1},"cks":{"\u0003":1},"k":{"s":1},"ks":{"\u0003":1},"\u0002Sn":{"o":1},"\u0002Sno":{"w":1},"\u0002Snow":{"b":1},"\u0002Snowb":{"a":1},"\u0002Snowba":{"l":1},"\u0002Snowbal":{"l":1},"\u0002Snowball":{"\u0003":1},"Sn":{"o":1},"Sno":{"w":1},"Snow":{"b":1},"Snowb":{"a":1},"Snowba":{"l":1},"Snowbal":{"l":1},"Snowball":{"\u0003":1},"no":{"w":1},"now":{"b":1},"nowb":{"a":1},"nowba":{"l":1},"nowbal":{"l":1},"nowball":{"\u0003":1},"ow":{"b":1},"owb":{"a":1},"owba":{"l":1},"owbal":{"l":1},"owball":{"\u0003":1},"w":{"b":1},"wb":{"a":1},"wba":{"l":1},"wbal":{"l":1},"wball":{"\u0003":1},"b":{"a":1},"ba":{"l":1},"bal":{"l":1},"ball":{"\u0003":1},"al":{"l":1},"all":{"\u0003":1},"ll":{"\u0003":1},"\u0002Si":{"m":1},"\u0002Sim":{"o":1},"\u0002Simo":{"n":1},"\u0002Simon":{"\u0003":1},"Si":{"m":1},"Sim":{"o":1},"Simo":{"n":1},"Simon":{"\u0003":1},"im":{"o":1},"imo":{"n":1},"imon":{"\u0003":1},"m":{"o":1},"mo":{"n":1},"mon":{"\u0003":1},"on":{"\u0003":1}}
randomTextGenerator.shrink(); // Do not use shrink() when the dataset is that small!
console.log(randomTextGenerator.saveWeightsToJson());
// {"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"D":{"a":1,"u":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"i":{"s":1,"l":1,"t":1,"m":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"C":{"l":1,"h":1,"a":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"t":{"y":1,"t":1,"e":1},"ey":{"\u0003":2},"\u0002S":{"o":1,"n":1,"i":1},"S":{"o":1,"n":1,"i":1}}
```

### saveToJson
Saves the generator parameters and weights to a json.
#### Syntax
```js
randomTextGenerator.saveToJson();
```
Returns **string**.
#### Example
```js
let pets=["Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon"];
for (let pet of pets) randomTextGenerator.learnExample(pet.split(""));

console.log(randomTextGenerator.saveToJson());
// {"deepness":40,"trust":2,"weights":{"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"\u0002Da":{"i":1},"\u0002Dai":{"s":1},"\u0002Dais":{"y":1},"\u0002Daisy":{"\u0003":1},"D":{"a":1,"u":1},"Da":{"i":1},"Dai":{"s":1},"Dais":{"y":1},"Daisy":{"\u0003":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"ais":{"y":1},"aisy":{"\u0003":1},"i":{"s":1,"l":1,"t":1,"m":1},"is":{"y":1},"isy":{"\u0003":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"sy":{"\u0003":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"\u0002Cl":{"e":1},"\u0002Cle":{"o":1},"\u0002Cleo":{"\u0003":1},"C":{"l":1,"h":1,"a":1},"Cl":{"e":1},"Cle":{"o":1},"Cleo":{"\u0003":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"leo":{"\u0003":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"eo":{"\u0003":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"\u0002Ch":{"l":1},"\u0002Chl":{"o":1},"\u0002Chlo":{"e":1},"\u0002Chloe":{"\u0003":1},"Ch":{"l":1},"Chl":{"o":1},"Chlo":{"e":1},"Chloe":{"\u0003":1},"h":{"l":1},"hl":{"o":1},"hlo":{"e":1},"hloe":{"\u0003":1},"lo":{"e":1},"loe":{"\u0003":1},"oe":{"\u0003":1},"\u0002A":{"n":1},"\u0002An":{"g":1},"\u0002Ang":{"e":1},"\u0002Ange":{"l":1},"\u0002Angel":{"\u0003":1},"A":{"n":1},"An":{"g":1},"Ang":{"e":1},"Ange":{"l":1},"Angel":{"\u0003":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"ng":{"e":1},"nge":{"l":1},"ngel":{"\u0003":1},"g":{"e":1},"ge":{"l":1},"gel":{"\u0003":1},"el":{"\u0003":1},"\u0002Du":{"s":1},"\u0002Dus":{"t":1},"\u0002Dust":{"y":1},"\u0002Dusty":{"\u0003":1},"Du":{"s":1},"Dus":{"t":1},"Dust":{"y":1},"Dusty":{"\u0003":1},"u":{"s":1},"us":{"t":1},"ust":{"y":1},"usty":{"\u0003":1},"st":{"y":1},"sty":{"\u0003":1},"t":{"y":1,"t":1,"e":1},"ty":{"\u0003":1},"\u0002B":{"a":1},"\u0002Ba":{"i":1},"\u0002Bai":{"l":1},"\u0002Bail":{"e":1},"\u0002Baile":{"y":1},"\u0002Bailey":{"\u0003":1},"B":{"a":1},"Ba":{"i":1},"Bai":{"l":1},"Bail":{"e":1},"Baile":{"y":1},"Bailey":{"\u0003":1},"ail":{"e":1},"aile":{"y":1},"ailey":{"\u0003":1},"il":{"e":1},"ile":{"y":1},"iley":{"\u0003":1},"ley":{"\u0003":1},"ey":{"\u0003":2},"\u0002M":{"i":1},"\u0002Mi":{"t":1},"\u0002Mit":{"t":1},"\u0002Mitt":{"e":1},"\u0002Mitte":{"n":1},"\u0002Mitten":{"s":1},"\u0002Mittens":{"\u0003":1},"M":{"i":1},"Mi":{"t":1},"Mit":{"t":1},"Mitt":{"e":1},"Mitte":{"n":1},"Mitten":{"s":1},"Mittens":{"\u0003":1},"it":{"t":1},"itt":{"e":1},"itte":{"n":1},"itten":{"s":1},"ittens":{"\u0003":1},"tt":{"e":1},"tte":{"n":1},"tten":{"s":1},"ttens":{"\u0003":1},"te":{"n":1},"ten":{"s":1},"tens":{"\u0003":1},"en":{"s":1},"ens":{"\u0003":1},"ns":{"\u0003":1},"\u0002Ca":{"s":1},"\u0002Cas":{"e":1},"\u0002Case":{"y":1},"\u0002Casey":{"\u0003":1},"Ca":{"s":1},"Cas":{"e":1},"Case":{"y":1},"Casey":{"\u0003":1},"as":{"e":1},"ase":{"y":1},"asey":{"\u0003":1},"se":{"y":1},"sey":{"\u0003":1},"\u0002S":{"o":1,"n":1,"i":1},"\u0002So":{"c":1},"\u0002Soc":{"k":1},"\u0002Sock":{"s":1},"\u0002Socks":{"\u0003":1},"S":{"o":1,"n":1,"i":1},"So":{"c":1},"Soc":{"k":1},"Sock":{"s":1},"Socks":{"\u0003":1},"oc":{"k":1},"ock":{"s":1},"ocks":{"\u0003":1},"c":{"k":1},"ck":{"s":1},"cks":{"\u0003":1},"k":{"s":1},"ks":{"\u0003":1},"\u0002Sn":{"o":1},"\u0002Sno":{"w":1},"\u0002Snow":{"b":1},"\u0002Snowb":{"a":1},"\u0002Snowba":{"l":1},"\u0002Snowbal":{"l":1},"\u0002Snowball":{"\u0003":1},"Sn":{"o":1},"Sno":{"w":1},"Snow":{"b":1},"Snowb":{"a":1},"Snowba":{"l":1},"Snowbal":{"l":1},"Snowball":{"\u0003":1},"no":{"w":1},"now":{"b":1},"nowb":{"a":1},"nowba":{"l":1},"nowbal":{"l":1},"nowball":{"\u0003":1},"ow":{"b":1},"owb":{"a":1},"owba":{"l":1},"owbal":{"l":1},"owball":{"\u0003":1},"w":{"b":1},"wb":{"a":1},"wba":{"l":1},"wbal":{"l":1},"wball":{"\u0003":1},"b":{"a":1},"ba":{"l":1},"bal":{"l":1},"ball":{"\u0003":1},"al":{"l":1},"all":{"\u0003":1},"ll":{"\u0003":1},"\u0002Si":{"m":1},"\u0002Sim":{"o":1},"\u0002Simo":{"n":1},"\u0002Simon":{"\u0003":1},"Si":{"m":1},"Sim":{"o":1},"Simo":{"n":1},"Simon":{"\u0003":1},"im":{"o":1},"imo":{"n":1},"imon":{"\u0003":1},"m":{"o":1},"mo":{"n":1},"mon":{"\u0003":1},"on":{"\u0003":1}},"splitter":"","limit":400,"startingCharacter":"\u0002","endingCharacter":"\u0003"}
```

### loadFromJson
Loads the generator parameters and weights from a json.
#### Syntax
```js
randomTextGenerator.loadFromJson(json);
```
```json``` - **string** containing the generator saved in the json format.<br/>
Returns **nothing**.

### saveWeightsToJson
Saves the generator weights to a json.
#### Syntax
```js
randomTextGenerator.saveWeightsToJson();
```
Returns **string**.
#### Example
```js
let pets=["Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon"];
for (let pet of pets) randomTextGenerator.learnExample(pet.split(""));

console.log(randomTextGenerator.saveWeightsToJson());
// "{"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"\u0002Da":{"i":1},"\u0002Dai":{"s":1},"\u0002Dais":{"y":1},"\u0002Daisy":{"\u0003":1},"D":{"a":1,"u":1},"Da":{"i":1},"Dai":{"s":1},"Dais":{"y":1},"Daisy":{"\u0003":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"ais":{"y":1},"aisy":{"\u0003":1},"i":{"s":1,"l":1,"t":1,"m":1},"is":{"y":1},"isy":{"\u0003":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"sy":{"\u0003":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"\u0002Cl":{"e":1},"\u0002Cle":{"o":1},"\u0002Cleo":{"\u0003":1},"C":{"l":1,"h":1,"a":1},"Cl":{"e":1},"Cle":{"o":1},"Cleo":{"\u0003":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"leo":{"\u0003":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"eo":{"\u0003":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"\u0002Ch":{"l":1},"\u0002Chl":{"o":1},"\u0002Chlo":{"e":1},"\u0002Chloe":{"\u0003":1},"Ch":{"l":1},"Chl":{"o":1},"Chlo":{"e":1},"Chloe":{"\u0003":1},"h":{"l":1},"hl":{"o":1},"hlo":{"e":1},"hloe":{"\u0003":1},"lo":{"e":1},"loe":{"\u0003":1},"oe":{"\u0003":1},"\u0002A":{"n":1},"\u0002An":{"g":1},"\u0002Ang":{"e":1},"\u0002Ange":{"l":1},"\u0002Angel":{"\u0003":1},"A":{"n":1},"An":{"g":1},"Ang":{"e":1},"Ange":{"l":1},"Angel":{"\u0003":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"ng":{"e":1},"nge":{"l":1},"ngel":{"\u0003":1},"g":{"e":1},"ge":{"l":1},"gel":{"\u0003":1},"el":{"\u0003":1},"\u0002Du":{"s":1},"\u0002Dus":{"t":1},"\u0002Dust":{"y":1},"\u0002Dusty":{"\u0003":1},"Du":{"s":1},"Dus":{"t":1},"Dust":{"y":1},"Dusty":{"\u0003":1},"u":{"s":1},"us":{"t":1},"ust":{"y":1},"usty":{"\u0003":1},"st":{"y":1},"sty":{"\u0003":1},"t":{"y":1,"t":1,"e":1},"ty":{"\u0003":1},"\u0002B":{"a":1},"\u0002Ba":{"i":1},"\u0002Bai":{"l":1},"\u0002Bail":{"e":1},"\u0002Baile":{"y":1},"\u0002Bailey":{"\u0003":1},"B":{"a":1},"Ba":{"i":1},"Bai":{"l":1},"Bail":{"e":1},"Baile":{"y":1},"Bailey":{"\u0003":1},"ail":{"e":1},"aile":{"y":1},"ailey":{"\u0003":1},"il":{"e":1},"ile":{"y":1},"iley":{"\u0003":1},"ley":{"\u0003":1},"ey":{"\u0003":2},"\u0002M":{"i":1},"\u0002Mi":{"t":1},"\u0002Mit":{"t":1},"\u0002Mitt":{"e":1},"\u0002Mitte":{"n":1},"\u0002Mitten":{"s":1},"\u0002Mittens":{"\u0003":1},"M":{"i":1},"Mi":{"t":1},"Mit":{"t":1},"Mitt":{"e":1},"Mitte":{"n":1},"Mitten":{"s":1},"Mittens":{"\u0003":1},"it":{"t":1},"itt":{"e":1},"itte":{"n":1},"itten":{"s":1},"ittens":{"\u0003":1},"tt":{"e":1},"tte":{"n":1},"tten":{"s":1},"ttens":{"\u0003":1},"te":{"n":1},"ten":{"s":1},"tens":{"\u0003":1},"en":{"s":1},"ens":{"\u0003":1},"ns":{"\u0003":1},"\u0002Ca":{"s":1},"\u0002Cas":{"e":1},"\u0002Case":{"y":1},"\u0002Casey":{"\u0003":1},"Ca":{"s":1},"Cas":{"e":1},"Case":{"y":1},"Casey":{"\u0003":1},"as":{"e":1},"ase":{"y":1},"asey":{"\u0003":1},"se":{"y":1},"sey":{"\u0003":1},"\u0002S":{"o":1,"n":1,"i":1},"\u0002So":{"c":1},"\u0002Soc":{"k":1},"\u0002Sock":{"s":1},"\u0002Socks":{"\u0003":1},"S":{"o":1,"n":1,"i":1},"So":{"c":1},"Soc":{"k":1},"Sock":{"s":1},"Socks":{"\u0003":1},"oc":{"k":1},"ock":{"s":1},"ocks":{"\u0003":1},"c":{"k":1},"ck":{"s":1},"cks":{"\u0003":1},"k":{"s":1},"ks":{"\u0003":1},"\u0002Sn":{"o":1},"\u0002Sno":{"w":1},"\u0002Snow":{"b":1},"\u0002Snowb":{"a":1},"\u0002Snowba":{"l":1},"\u0002Snowbal":{"l":1},"\u0002Snowball":{"\u0003":1},"Sn":{"o":1},"Sno":{"w":1},"Snow":{"b":1},"Snowb":{"a":1},"Snowba":{"l":1},"Snowbal":{"l":1},"Snowball":{"\u0003":1},"no":{"w":1},"now":{"b":1},"nowb":{"a":1},"nowba":{"l":1},"nowbal":{"l":1},"nowball":{"\u0003":1},"ow":{"b":1},"owb":{"a":1},"owba":{"l":1},"owbal":{"l":1},"owball":{"\u0003":1},"w":{"b":1},"wb":{"a":1},"wba":{"l":1},"wbal":{"l":1},"wball":{"\u0003":1},"b":{"a":1},"ba":{"l":1},"bal":{"l":1},"ball":{"\u0003":1},"al":{"l":1},"all":{"\u0003":1},"ll":{"\u0003":1},"\u0002Si":{"m":1},"\u0002Sim":{"o":1},"\u0002Simo":{"n":1},"\u0002Simon":{"\u0003":1},"Si":{"m":1},"Sim":{"o":1},"Simo":{"n":1},"Simon":{"\u0003":1},"im":{"o":1},"imo":{"n":1},"imon":{"\u0003":1},"m":{"o":1},"mo":{"n":1},"mon":{"\u0003":1},"on":{"\u0003":1}}"
```

### loadWeightsFromJson
Loads the generator weights from a json.
#### Syntax
```js
randomTextGenerator.loadWeightsFromJson(json);
```
```json``` - **string** containing the generator's weights saved in the json format.<br/>
Returns **nothing**.
#### Example
```js
let json=String.raw`{"\u0002":{"G":1,"P":1,"B":1,"R":1,"N":1,"S":1},"\u0002G":{"e":1},"\u0002Ge":{"r":1},"\u0002Ger":{"m":1},"\u0002Germ":{"a":1},"\u0002Germa":{"n":1},"\u0002German":{"y":1},"\u0002Germany":{"\u0003":1},"G":{"e":1},"Ge":{"r":1},"Ger":{"m":1},"Germ":{"a":1},"Germa":{"n":1},"German":{"y":1},"Germany":{"\u0003":1},"e":{"r":1,"l":1,"d":1,"n":1},"er":{"m":1},"erm":{"a":1},"erma":{"n":1},"erman":{"y":1},"ermany":{"\u0003":1},"r":{"m":1,"w":1},"rm":{"a":1},"rma":{"n":1},"rman":{"y":1},"rmany":{"\u0003":1},"m":{"a":1,"\u0003":1},"ma":{"n":1},"man":{"y":1},"many":{"\u0003":1},"a":{"n":2,"\u0003":1,"y":1},"an":{"y":1,"d":1},"any":{"\u0003":1},"n":{"y":1,"d":1,"\u0003":1},"ny":{"\u0003":1},"y":{"\u0003":2},"\u0002P":{"o":1},"\u0002Po":{"l":1},"\u0002Pol":{"a":1},"\u0002Pola":{"n":1},"\u0002Polan":{"d":1},"\u0002Poland":{"\u0003":1},"P":{"o":1},"Po":{"l":1},"Pol":{"a":1},"Pola":{"n":1},"Polan":{"d":1},"Poland":{"\u0003":1},"o":{"l":1,"r":1},"ol":{"a":1},"ola":{"n":1},"olan":{"d":1},"oland":{"\u0003":1},"l":{"a":1,"g":1},"la":{"n":1},"lan":{"d":1},"land":{"\u0003":1},"and":{"\u0003":1},"nd":{"\u0003":1},"d":{"\u0003":1,"e":1},"\u0002B":{"e":1},"\u0002Be":{"l":1},"\u0002Bel":{"g":1},"\u0002Belg":{"i":1},"\u0002Belgi":{"u":1},"\u0002Belgiu":{"m":1},"\u0002Belgium":{"\u0003":1},"B":{"e":1},"Be":{"l":1},"Bel":{"g":1},"Belg":{"i":1},"Belgi":{"u":1},"Belgiu":{"m":1},"Belgium":{"\u0003":1},"el":{"g":1},"elg":{"i":1},"elgi":{"u":1},"elgiu":{"m":1},"elgium":{"\u0003":1},"lg":{"i":1},"lgi":{"u":1},"lgiu":{"m":1},"lgium":{"\u0003":1},"g":{"i":1},"gi":{"u":1},"giu":{"m":1},"gium":{"\u0003":1},"i":{"u":1,"a":1},"iu":{"m":1},"ium":{"\u0003":1},"u":{"m":1,"s":1},"um":{"\u0003":1},"\u0002R":{"u":1},"\u0002Ru":{"s":1},"\u0002Rus":{"s":1},"\u0002Russ":{"i":1},"\u0002Russi":{"a":1},"\u0002Russia":{"\u0003":1},"R":{"u":1},"Ru":{"s":1},"Rus":{"s":1},"Russ":{"i":1},"Russi":{"a":1},"Russia":{"\u0003":1},"us":{"s":1},"uss":{"i":1},"ussi":{"a":1},"ussia":{"\u0003":1},"s":{"s":1,"i":1},"ss":{"i":1},"ssi":{"a":1},"ssia":{"\u0003":1},"si":{"a":1},"sia":{"\u0003":1},"ia":{"\u0003":1},"\u0002N":{"o":1},"\u0002No":{"r":1},"\u0002Nor":{"w":1},"\u0002Norw":{"a":1},"\u0002Norwa":{"y":1},"\u0002Norway":{"\u0003":1},"N":{"o":1},"No":{"r":1},"Nor":{"w":1},"Norw":{"a":1},"Norwa":{"y":1},"Norway":{"\u0003":1},"or":{"w":1},"orw":{"a":1},"orwa":{"y":1},"orway":{"\u0003":1},"rw":{"a":1},"rwa":{"y":1},"rway":{"\u0003":1},"w":{"a":1,"e":1},"wa":{"y":1},"way":{"\u0003":1},"ay":{"\u0003":1},"\u0002S":{"w":1},"\u0002Sw":{"e":1},"\u0002Swe":{"d":1},"\u0002Swed":{"e":1},"\u0002Swede":{"n":1},"\u0002Sweden":{"\u0003":1},"S":{"w":1},"Sw":{"e":1},"Swe":{"d":1},"Swed":{"e":1},"Swede":{"n":1},"Sweden":{"\u0003":1},"we":{"d":1},"wed":{"e":1},"wede":{"n":1},"weden":{"\u0003":1},"ed":{"e":1},"ede":{"n":1},"eden":{"\u0003":1},"de":{"n":1},"den":{"\u0003":1},"en":{"\u0003":1}}`
randomTextGenerator.loadWeightsFromJson(json);
for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate().join("");
	console.log(name);
}
// Ged
// Swa
// Bederwa
// Belgiuma
```

## Examples
### Generating Words
#### Usernames
```js
// Create an instance of the generator with default settings.
let randomTextGenerator=createRandomTextGenerator();

// Make an array with some usernames.
let usernames=["StinkyPoop", "Alextron234", "BattleDash", "berkey10", "Ezblox23", "robiko858", "zakizakowski", "MrArtur1337", "AzisDeus", "AustrianPainter1889", "pomidorek2pl", "JoeMamma", "MafiaBoss75", "SciManDan", "siuras_ogoras986", "jacob.flix", "malario", "BenDrowned", "pickupthefox", "okboomer"];
// Iterate through every username and pass them to the generator. You have to pass split them and pass an array of strings like ["m", "a", "l", "a", "r", "i", "o"].
for (let username of usernames) randomTextGenerator.learnExample(username.split(""));

// console.log twelve nicknames
for (let i=0; i<12; ++i) {
	let username=randomTextGenerator.generate().join("");
	console.log(username);
}

// Examplary output:
// jas98
// ooomeMama
// strian
// stheur185
// mali
// zbickbik23
// porenPoras_oplius
// Aur134
// Scko86
// BanPalox
// Stus
// ron
```
### Generating Texts
#### English Lorem Ipsum
```js
// Create an instance of the generator. Because you want to generate a text you should set the splitter to " " and use a smaller deepness that the default 40 (to save memory). In this case the deepness says how many of previous words determine the following words.
let randomTextGenerator=createRandomTextGenerator({splitter: " ", deepness: 7});

// Make a string with a long text. Source: https://en.wikipedia.org/wiki/Nineteen_Eighty-Four.
let examplaryText=`Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. The story was mostly written at Barnhill, a farmhouse on the Scottish island of Jura, at times while Orwell suffered from severe tuberculosis. Thematically, Nineteen Eighty-Four centres on the consequences of government over-reach, totalitarianism, and repressive regimentation of all persons and behaviours within society. The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skilful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia. Nineteen Eighty-Four has become a classic literary example of political and dystopian fiction. Many terms used in the novel have entered common usage, including Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 + 2 = 5, prole, and memory hole. Nineteen Eighty-Four also popularised the adjective "Orwellian", connoting things such as official deception, secret surveillance, brazenly misleading terminology, and manipulation of recorded history by a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to 2005. It was placed on the Modern Library's 100 Best Novels, reaching No. 13 on the editors' list and No. 6 on the readers' list. In 2003, the novel was listed at No. 8 on The Big Read survey by the BBC. Parallels have been drawn between the novel's subject matter and real life instances of totalitarianism, mass surveillance, and violations of freedom of expression among other themes.`;
// Pass the examplaryText to the generator. Remember to split it using a space character.
randomTextGenerator.learnExample(examplaryText.split(" "));

// console.log a generated Lorem Ipsum
console.log(randomTextGenerator.generate().join(" "));

// Examplary output:
// Nineteen Eighty-Four has become a classic literary example of political and Party who secretly hates the adjective "Orwellian", connoting things such as official deception, secret surveillance, and behaviours within society. The story was mostly written at Barnhill, a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to perpetual war, omnipresent government surveillance, brazenly misleading terminology, and Party who employ the fact that is a diligent and dystopian fiction. Many terms used in the Party, enjoys an intense cult of political and memory hole. Nineteen Eighty-Four centres on The Big Brother, the Party and independent thinking. Big Brother, the Party, enjoys an intense cult of recorded history by the Party who secretly hates the Scottish island of government over-reach, totalitarianism, mass surveillance, brazenly misleading terminology, and memory hole. Nineteen Eighty-Four also popularised the editors' list and dystopian fiction. Many terms used in the Party who employ the adjective "Orwellian", connoting things such as Orwell's ninth and repressive regimentation of totalitarianism, and final book completed in June 1949 by a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to persecute individuality and Party member who employ the leader of Jura, at No. 6 on The Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 = 5, prole, and manipulation of freedom of all persons and skilful rank-and-file worker and skilful rank-and-file worker and independent thinking. Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 + 2 = 5, prole, and independent thinking. Big Read survey by a dystopian fiction. Many terms used in the fact that is ruled by the Party and Party who secretly hates the leader of expression among other themes.
```

## Data
There are no data provided with the library, so you have to get it yourself. However, you can use the data I store on my website.
Make a request to `https://rafal-majewski.firebaseapp.com/text_database/list.json` and get a list of currently available datasets.
Items on the list consist of 3 keys:
`id` - **string**. Id of the dataset.<br/>
`path` - **string**. Path to the dataset.<br/>
`type` - **string**. Whether it is a dataset of words (value: `word`) or texts (value: `text`).
Then make a request to `https://rafal-majewski.firebaseapp.com/text_database/data/{dataset.path}`. For example `https://rafal-majewski.firebaseapp.com/text_database/data/american_towns.txt`.
Items in the datasets are separated by `\n` and there are **no** duplicated items.