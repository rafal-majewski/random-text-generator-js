# random-text-generator-js
With this generator you can generate names for:
- animals 🐶🐱🐮🐷
- planets 🌎
- your children 👶
- people 👩🧑👨
- cities 🏘🏢
- lands 🏝⛰🗻
- Linux distributions 💻🐧
- and anything you want...<br/>
Moreover, you can generate custom Lorem Ipsums!

Play with it at [random-text-generator.firebaseapp.com](https://random-text-generator.firebaseapp.com/).

What the generator does is basically remembering what characters can come after another. While generating it creates and empty string and predicts new characters in a loop.

The generator **does not** use any kind of a neural network so don't expect the results to make any logical sense. They are statistically correct which makes them look natural. If you were looking for an intelligent random text generator you should take a look at [brain.js](#https://brain.js.org/).

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
	- [Generating words](#examples-words)
		- [Usernames](#examples-usernames)
	- [Generating texts](#examples-texts)
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
	let name=randomTextGenerator.lengthen("Ob").join("");
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
Similar to [lengthen](#lengthen), but gives you only the predicted following character.
#### Syntax
```js
randomTextGenerator.lengthen(splittedWord);
```
```splittedWord``` - **array** of **string**s<br/>
Returns **string**.
#### Example
```js
let presidents=["Trmup", "Obama", "Bush", "Clinton", "Bush", "Reagan", "Carter"];
for (let president of presidents) randomTextGenerator.learnExample(president.split(""));

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.lengthen("Ob").join("");
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

### shrink
Reduces the size of the generator's weights by removing saved substrings that have less occurrences than the `trust` value. May cause negative effects when the dataset the generator used for learning is small, so use it only when neccessary.
#### Syntax
```js
randomTextGenerator.shrink();
```
Returns **nothing**.

### saveToJson
Saves the generator parameters and weights to a json.
#### Syntax
```js
randomTextGenerator.saveToJson();
```
Returns **string**.

### loadFromJson
Loads the generator parameters and weights from a json.
#### Syntax
```js
randomTextGenerator.loadFromJson(json);
```
```json``` - **string** containing an object saved in the json format.<br/>
Returns **nothing**.

### saveWeightsToJson
Saves the generator weights to a json.
#### Syntax
```js
randomTextGenerator.saveWeightsToJson();
```
Returns **string**.

### loadWeightsFromJson
Loads the generator weights from a json.
#### Syntax
```js
randomTextGenerator.loadWeightsFromJson(json);
```
```json``` - **string** containing an object saved in the json format.<br/>
Returns **nothing**.

## Examples
### Generating words
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
### Generating texts
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