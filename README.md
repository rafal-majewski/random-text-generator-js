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

~~Play with it at [random-text-generator.firebaseapp.com](https://random-text-generator.firebaseapp.com/).~~

What the generator does is basically remembering what characters can come after another. While generating it creates and empty string and predicts new characters in a loop.

The generator does not use any kind of a neural network so don't expect the results to make any logical sense. They are statistically correct which makes them look natural. If you were looking for an intelligent random text generator you should use a neural network library like [brain.js](https://brain.js.org/).

Throughout the documentation I will be saying that the generator generates `words` that are made out of `characters` but don't worry, if you want to generate texts, just put words instead of characters and you will get sentences 😉.

Note: Generated words in some examples may look odd, that's because of not sufficient amout of learning data. The more learning data you provide the better the results.

## Table of contents
- [License](#License)
- [Obtaining](#obtaining)
- [Getting Started](#getting-started)
- [Examples](#examples)
	- [Usernames](#usernames)
	- [Multiple origins generation](#multiple-origins-generation)
	- [English Lorem Ipsum](#english-lorem-ipsum)
- [Functions](#functions)
	- [learn](#learn)
	- [learnRight](#learnRight)
	- [learnLeft](#learnLeft)
	- [learnBoth](#learnBoth)
	- [forget](#forget)
	- [forgetRight](#forgetRight)
	- [forgetLeft](#forgetLeft)
	- [forgetBoth](#forgetBoth)
	- [generate](#generate)
	- [generateRight](#generateRight)
	- [generateLeft](#generateLeft)
	- [generateBoth](#generateBoth)
	- [validate](#validate)
	- [validateRight](#validateRight)
	- [validateLeft](#validateLeft)
	- [shrink](#shrink)
	- [shrinkRight](#shrinkRight)
	- [shrinkLeft](#shrinkLeft)
	- [shrinkBoth](#shrinkBoth)
	- [saveToJson](#saveToJson)
	- [loadFromJson](#loadFromJson)
	- [saveWeightsToJson](#saveWeightsToJson)
	- [loadWeightsFromJson](#loadWeightsFromJson)

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

### node.js
```bash
npm install random-text-generator
```
```js
const RandomTextGenerator=require("random-text-generator");
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

## Examples
### Usernames
```js
const RandomTextGenerator=require("random-text-generator");

// Create an instance of the generator with default settings.
let randomTextGenerator=new RandomTextGenerator();

// Make an array with some usernames.
let usernames=["StinkyPoop", "Alextron234", "BattleDash", "berkey10", "Ezblox23", "robiko858", "zakizakowski", "MrArtur1337", "AzisDeus", "AustrianPainter1889", "pomidorek2pl", "JoeMamma", "MafiaBoss75", "SciManDan", "siuras_ogoras986", "jacob.flix", "malario", "BenDrowned", "pickupthefox", "okboomer", "GHPL", "Firstbober"];

// Pass every username to the generator.
for (let username of usernames) randomTextGenerator.learn(username);

// console.log twelve new nicknames.
for (let i=0; i<12; ++i) {
	let username=randomTextGenerator.generate();
	console.log(username);
}
// AleDras9
// JoreMamaliky1886
// ziriaBateDeDas_ownkiziMrsDer
// Mrey10
// Ezidoomiskblex
// oeMan
// jan
// Fioomer
// Alox
// GHPaBober
// zakizbi
// Ezakizako889
```

### Multiple Origins Generation
```js
const RandomTextGenerator=require("random-text-generator");

// Create an instance of the generator with default settings.
let randomTextGenerator=new RandomTextGenerator();

let americanCities=["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","San Francisco","Charlotte","Indianapolis","Seattle","Denver","Washington","Boston","El Paso","Detroit","Nashville","Portland","Memphis","Oklahoma City","Las Vegas","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Mesa","Sacramento","Atlanta","Kansas City","Colorado Springs","Miami","Raleigh","Omaha","Long Beach","Virginia Beach","Oakland","Minneapolis","Tulsa","Arlington","Tampa","New Orleans","Wichita","Cleveland","Bakersfield","Aurora","Anaheim","Honolulu","Santa Ana","Riverside","Corpus Christi","Lexington","Stockton","Henderson","Saint Paul","St. Louis","Cincinnati","Pittsburgh","Greensboro","Anchorage","Plano","Lincoln","Orlando","Irvine","Newark","Toledo","Durham","Chula Vista","Fort Wayne","Jersey City","St. Petersburg","Laredo","Madison","Chandler","Buffalo","Lubbock","Scottsdale","Reno","Glendale","Gilbert","Winston–Salem","North Las Vegas","Norfolk","Chesapeake","Garland","Irving","Hialeah","Fremont","Boise","Richmond","Baton Rouge","Spokane","Des Moines","Tacoma","San Bernardino","Modesto","Fontana","Santa Clarita","Birmingham","Oxnard","Fayetteville","Moreno Valley","Rochester","Glendale","Huntington Beach","Salt Lake City","Grand Rapids","Amarillo","Yonkers","Aurora","Montgomery","Akron","Little Rock","Huntsville","Augusta","Port St. Lucie","Grand Prairie","Columbus","Tallahassee","Overland Park","Tempe","McKinney","Mobile","Cape Coral","Shreveport","Frisco","Knoxville","Worcester","Brownsville","Vancouver","Fort Lauderdale","Sioux Falls","Ontario","Chattanooga","Providence","Newport News","Rancho Cucamonga","Santa Rosa","Oceanside","Salem","Elk Grove","Garden Grove","Pembroke Pines","Peoria","Eugene","Corona","Cary","Springfield","Fort Collins","Jackson","Alexandria","Hayward","Lancaster","Lakewood","Clarksville","Palmdale","Salinas","Springfield","Hollywood","Pasadena","Sunnyvale","Macon","Kansas City","Pomona","Escondido","Killeen","Naperville","Joliet","Bellevue","Rockford","Savannah","Paterson","Torrance","Bridgeport","McAllen","Mesquite","Syracuse","Midland","Pasadena","Murfreesboro","Miramar","Dayton","Fullerton","Olathe","Orange","Thornton","Roseville","Denton","Waco","Surprise","Carrollton","West Valley City","Charleston","Warren","Hampton","Gainesville","Visalia","Coral Springs","Columbia","Cedar Rapids","Sterling Heights","New Haven","Stamford","Concord","Kent","Santa Clara","Elizabeth","Round Rock","Thousand Oaks","Lafayette","Athens","Topeka","Simi Valley","Fargo","Norman","Columbia","Abilene","Wilmington","Hartford","Victorville","Pearland","Vallejo","Ann Arbor","Berkeley","Allentown","Richardson","Odessa","Arvada","Cambridge","Sugar Land","Beaumont","Lansing","Evansville","Rochester","Independence","Fairfield","Provo","Clearwater","College Station","West Jordan","Carlsbad","El Monte","Murrieta","Temecula","Springfield","Palm Bay","Costa Mesa","Westminster","North Charleston","Miami Gardens","Manchester","High Point","Downey","Clovis","Pompano Beach","Pueblo","Elgin","Lowell","Antioch","West Palm Beach","Peoria","Everett","Ventura","Centennial","Lakeland","Gresham","Richmond","Billings","Inglewood","Broken Arrow","Sandy Springs","Jurupa Valley","Hillsboro","Waterbury","Santa Maria","Boulder","Greeley","Daly City","Meridian","Lewisville","Davie","West Covina","League City","Tyler","Norwalk","San Mateo","Green Bay","Wichita Falls","Sparks","Lakewood","Burbank","Rialto","Allen","El Cajon","Las Cruces","Renton","Davenport","South Bend","Vista","Tuscaloosa","Clinton","Edison","Woodbridge","San Angelo","Kenosha","Vacaville"];

let polishCities=["Warszawa","Kraków","Łódź","Wrocław","Poznań","Gdańsk","Szczecin","Bydgoszcz","Lublin","Białystok","Katowice","Gdynia","Częstochowa","Radom","Toruń","Sosnowiec","Kielce,Rzeszów","Gliwice","Zabrze","Olsztyn","Bielsko-Biała","Bytom","Zielona Góra","Rybnik","Ruda Śląska","Opole","Tychy","Gorzów Wielkopolski","Płock","Dąbrowa Górnicza","Elbląg","Wałbrzych","Włocławek","Tarnów","Chorzów","Koszalin","Kalisz"]

// Teach the generator the names of the cities, but preserve its origin.
for (let americanCity of americanCities) randomTextGenerator.learn(americanCity, "americanCity");
for (let polishCity of polishCities) randomTextGenerator.learn(polishCity, "polishCity");

// console.log twelve new city names.
for (let i=0; i<12; ++i) {
	// randomTextGenerator.generate(text, origins, isRaw);
	// we are going to leave the "text" field null, because we don't want any specific characters at the beginning.
	// origins is an array where you can specify the origins you want the generator to generate from, in this case you can leave it as null, because by default the generator uses all origins
	let city=randomTextGenerator.generate(null, ["polishCity", "americanCity"]); //
	console.log(city);
}
// San Jortisvina
// Mouleghornówek
// Glea
// Fa
// Hinicesalmaiorolisz
// Sangandbrzea
// Watins Clencin
// Bakevilente
// Worte
// Daberainghanderg
// Ork
// Sa

// The output should contain features of both training datasets.
```

### English Lorem Ipsum
```js
const RandomTextGenerator=require("random-text-generator");

// Create an instance of the generator. Because you want to generate a text you should set the splitter to " " and use a smaller deepness that the default 40 (to save memory and training time). In this case the deepness says how many of previous words determine the following words.
let randomTextGenerator=new RandomTextGenerator({splitter: " ", deepness: 8});


// Make a string with a long text. Source: https://en.wikipedia.org/wiki/Nineteen_Eighty-Four.
let exemplaryText=`Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. The story was mostly written at Barnhill, a farmhouse on the Scottish island of Jura, at times while Orwell suffered from severe tuberculosis. Thematically, Nineteen Eighty-Four centres on the consequences of government over-reach, totalitarianism, and repressive regimentation of all persons and behaviours within society. The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skilful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia. Nineteen Eighty-Four has become a classic literary example of political and dystopian fiction. Many terms used in the novel have entered common usage, including Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 + 2 = 5, prole, and memory hole. Nineteen Eighty-Four also popularised the adjective "Orwellian", connoting things such as official deception, secret surveillance, brazenly misleading terminology, and manipulation of recorded history by a totalitarian or authoritarian state. Time included it on its one hundred best English-language novels from 1923 to 2005. It was placed on the Modern Library's 100 Best Novels, reaching No. 13 on the editors' list and No. 6 on the readers' list. In 2003, the novel was listed at No. 8 on The Big Read survey by the BBC. Parallels have been drawn between the novel's subject matter and real life instances of totalitarianism, mass surveillance, and violations of freedom of expression among other themes.`;

// Pass the exemplaryText to the generator. You should split it at first, because it is a text.
randomTextGenerator.learn(exemplaryText.split(" "));

// console.log the generated Lorem Ipsum
console.log(randomTextGenerator.generate());
// Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian fiction. Many terms used in the Scottish island of rebellion. He enters a dystopian fiction. Many terms used in June 1949 by Secker & Warburg as 1984, when much of a co-worker, Julia. Nineteen Eighty-Four has become a classic literary example of Jura, at Barnhill, a dystopian novel by Secker & Warburg as Airstrip One, has fallen victim to perpetual war, omnipresent government over-reach, totalitarianism, and memory hole. Nineteen Eighty-Four has become a classic literary example of all persons and final book completed in an imagined future, the adjective "Orwellian", connoting things such as Airstrip One, has become a province of political and skilful rank-and-file worker and Party who secretly hates the Scottish island of totalitarianism, mass surveillance, and propaganda. Great Britain, known as 1984, when much of freedom of totalitarianism, and real life instances of a province of rebellion. He enters a classic literary example of political and real life instances of all persons and dreams of totalitarianism, and propaganda. Great Britain, known as 1984, when much of totalitarianism, mass surveillance, historical negationism and repressive regimentation of freedom of freedom of all persons and Party who employ the consequences of recorded history by a dystopian novel was published in the Scottish island of rebellion. He enters a dystopian novel have entered common usage, including Big Brother, the leader of Jura, at times while Orwell suffered from 1923 to persecute individuality and independent thinking. Big Brother, the BBC. Parallels have been drawn between the year 1984, when much of political and independent thinking. Big Brother, doublethink, thoughtcrime, Newspeak, Room 101, telescreen, 2 = 5, prole, and violations of expression among other themes.
```

## Functions
### learn
An alias for [learnRight](#learn-right).

### learnRight
Teaches the generator a new word (left -> right).
#### Syntax
```js
randomTextGenerator.learn(example, origin, multiplier, isRaw);
// or
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
randomTextGenerator.forget(example, origin, multiplier, isRaw);
// or
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

### predict
An alias for [predictRight](#predict-right).

### predictRight
Predicts the next character.
#### Syntax
```js
randomTextGenerator.predict(text, origins, isRaw, obeyLimit);
// or
randomTextGenerator.predictRight(text, origins, isRaw, obeyLimit);
```
- **text** - string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsRight)`<br/>
Specifies the origins allowed in the generation process<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>
- **obeyLimit** - *optional*, boolean, by default `false`<br/>
If `true` the generator obeys the minimal and maximal length boundaries while generating.<br/><br/>
Returns string.
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
// \3 (the default end of word character)
// h
```

### predictLeft
Predicts the next character on the left.
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
If `true` the generator obeys the minimal and maximal length boundaries while generating.<br/><br/>
Returns string.
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

### generate
An alias for [generateRight](#generate-right).

### generateRight
Generates a new word (left -> right) or lengthens given input.
#### Syntax
```js
randomTextGenerator.generate(text, origins, isRaw);
// or
randomTextGenerator.generateRight(text, origins, isRaw);
```
- **text** - *optional*, string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsRight)`<br/>
Specifies the origins allowed in the generation process.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>

Returns string. `randomTextGenerator.splitter` is used automatically to join characters.
#### Example
```js
let petNames=["Rosie", "Charlie", "Alfie", "Molly", "Bella", "Poppy", "Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon", "Teddy", "Lola", "Millie", "Tilly", "Coco", "Luna", "Phoebe"];

petNames.forEach((petName)=>{
	randomTextGenerator.learn(petName);
});

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}
// Phlockse
// Anose
// Alie
// Be

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate("M");
	console.log(name);
}
// Miley
// Mopy
// Milly
// Moebebeddy

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate("Be");
	console.log(name);
}
// Bey
// Beddy
// Be
// Bey
```

### generateLeft
Generates a new word (right -> left) or lengthens given input.
#### Syntax
```js
randomTextGenerator.generateLeft(text, origins, isRaw);
```
- **text** - *optional*, string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsLeft)`<br/>
Specifies the origins allowed in the generation process.<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/>

Returns string. `randomTextGenerator.splitter` is used automatically to join characters.
#### Example
```js
let petNames=["Rosie", "Charlie", "Alfie", "Molly", "Bella", "Poppy", "Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon", "Teddy", "Lola", "Millie", "Tilly", "Coco", "Luna", "Phoebe"];

petNames.forEach((petName)=>{
	randomTextGenerator.learnLeft(petName);
});

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft();
	console.log(name);
}
// Choeo
// Bel
// Tiloppppy
// Soco

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft("la");
	console.log(name);
}
// Mola
// Lolla
// Molla
// Mola

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateLeft("e");
	console.log(name);
}
// Lollie
// Callie
// Conarlie
// Challasie
```

### generateBoth
Generates a new word bothways.
#### Syntax
```js
randomTextGenerator.generateBoth(text, origins);
```
- **text** - string or array of strings<br/>
Text to predict next character from.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsRight)` combined with `Object.keys(randomTextGenerator.weightsLeft)`.<br/>
Specifies the origins allowed in the generation process.<br/>

Returns string. `randomTextGenerator.splitter` is used automatically to join characters.
#### Example
```js
let petNames=["Rosie", "Charlie", "Alfie", "Molly", "Bella", "Poppy", "Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon", "Teddy", "Lola", "Millie", "Tilly", "Coco", "Luna", "Phoebe"];

petNames.forEach((petName)=>{
	randomTextGenerator.learnBoth(petName); // in order to generate bothways you have to teach the generator using .learnBoth()
});

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateBoth("ll"); // the first argument is not optional, the generator cannot generate bothways out of thin air
	console.log(name);
}
// Lollie
// Dungell
// Milla
// Tilla

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateBoth("una");
	console.log(name);
}
// Lunalfise
// Lunais
// Lunaillie
// Luna

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generateBoth("ar");
	console.log(name);
}
// Lusebarlie
// Barlla
// Charly
// Darloebaistty
```

### validate
An alias for [validateRight](#validate-right).

### validateRight
Calculates the resemblance of a given word (left -> right) to the words the generator previously learned.
#### Syntax
```js
randomTextGenerator.validate(text, origins, isRaw);
// or
randomTextGenerator.validateRight(text, origins, isRaw);
```
- **text** - string or array of strings<br/>
Text to calculate the resemblance of.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsRight)`<br/>
Specifies the origins allowed in the generation process<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/><br/>
Returns string.
#### Example
```js
let cities=["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","San Francisco","Charlotte","Indianapolis","Seattle","Denver","Washington","Boston","El Paso","Detroit","Nashville","Portland","Memphis","Oklahoma City","Las Vegas","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Mesa","Sacramento","Atlanta","Kansas City","Colorado Springs","Miami","Raleigh","Omaha","Long Beach","Virginia Beach","Oakland","Minneapolis","Tulsa","Arlington","Tampa","New Orleans","Wichita","Cleveland","Bakersfield","Aurora","Anaheim","Honolulu","Santa Ana","Riverside","Corpus Christi","Lexington","Stockton","Henderson","Saint Paul","St. Louis","Cincinnati","Pittsburgh","Greensboro","Anchorage","Plano","Lincoln","Orlando","Irvine","Newark","Toledo","Durham","Chula Vista","Fort Wayne","Jersey City","St. Petersburg","Laredo","Madison","Chandler","Buffalo","Lubbock","Scottsdale","Reno","Glendale","Gilbert","Winston–Salem","North Las Vegas","Norfolk","Chesapeake","Garland","Irving","Hialeah","Fremont","Boise","Richmond","Baton Rouge","Spokane","Des Moines","Tacoma","San Bernardino","Modesto","Fontana","Santa Clarita","Birmingham","Oxnard","Fayetteville","Moreno Valley","Rochester","Glendale","Huntington Beach","Salt Lake City","Grand Rapids","Amarillo","Yonkers","Aurora","Montgomery","Akron","Little Rock","Huntsville","Augusta","Port St. Lucie","Grand Prairie","Columbus","Tallahassee","Overland Park","Tempe","McKinney","Mobile","Cape Coral","Shreveport","Frisco","Knoxville","Worcester","Brownsville","Vancouver","Fort Lauderdale","Sioux Falls","Ontario","Chattanooga","Providence","Newport News","Rancho Cucamonga","Santa Rosa","Oceanside","Salem","Elk Grove","Garden Grove","Pembroke Pines","Peoria","Eugene","Corona","Cary","Springfield","Fort Collins","Jackson","Alexandria","Hayward","Lancaster","Lakewood","Clarksville","Palmdale","Salinas","Springfield","Hollywood","Pasadena","Sunnyvale","Macon","Kansas City","Pomona","Escondido","Killeen","Naperville","Joliet","Bellevue","Rockford","Savannah","Paterson","Torrance","Bridgeport","McAllen","Mesquite","Syracuse","Midland","Pasadena","Murfreesboro","Miramar","Dayton","Fullerton","Olathe","Orange","Thornton","Roseville","Denton","Waco","Surprise","Carrollton","West Valley City","Charleston","Warren","Hampton","Gainesville","Visalia","Coral Springs","Columbia","Cedar Rapids","Sterling Heights","New Haven","Stamford","Concord","Kent","Santa Clara","Elizabeth","Round Rock","Thousand Oaks","Lafayette","Athens","Topeka","Simi Valley","Fargo","Norman","Columbia","Abilene","Wilmington","Hartford","Victorville","Pearland","Vallejo","Ann Arbor","Berkeley","Allentown","Richardson","Odessa","Arvada","Cambridge","Sugar Land","Beaumont","Lansing","Evansville","Rochester","Independence","Fairfield","Provo","Clearwater","College Station","West Jordan","Carlsbad","El Monte","Murrieta","Temecula","Springfield","Palm Bay","Costa Mesa","Westminster","North Charleston","Miami Gardens","Manchester","High Point","Downey","Clovis","Pompano Beach","Pueblo","Elgin","Lowell","Antioch","West Palm Beach","Peoria","Everett","Ventura","Centennial","Lakeland","Gresham","Richmond","Billings","Inglewood","Broken Arrow","Sandy Springs","Jurupa Valley","Hillsboro","Waterbury","Santa Maria","Boulder","Greeley","Daly City","Meridian","Lewisville","Davie","West Covina","League City","Tyler","Norwalk","San Mateo","Green Bay","Wichita Falls","Sparks","Lakewood","Burbank","Rialto","Allen","El Cajon","Las Cruces","Renton","Davenport","South Bend","Vista","Tuscaloosa","Clinton","Edison","Woodbridge","San Angelo","Kenosha","Vacaville"];

cities.forEach((city)=>{
	randomTextGenerator.learnRight(city);
});

console.log(randomTextGenerator.validateRight("New York"));
// 1
console.log(randomTextGenerator.validateRight("Saint Louis"));
// 0.5512820512820513
console.log(randomTextGenerator.validateRight("Garden City"));
// 0.5512820512820513
console.log(randomTextGenerator.validateRight("Ballard"));
// 0.5
console.log(randomTextGenerator.validateRight("Hermann"));
// 0.3611111111111111
console.log(randomTextGenerator.validateRight("Parsons"));
// 0.3888888888888889
console.log(randomTextGenerator.validateRight("Lutts"));
// 0.42857142857142855
console.log(randomTextGenerator.validateRight("Erzincan"));
// 0.2
console.log(randomTextGenerator.validateRight("Omsk"));
// 0.26666666666666666
console.log(randomTextGenerator.validateRight("Wadowice"));
// 0.26666666666666666
console.log(randomTextGenerator.validateRight("Sandomierz"));
// 0.25757575757575757
console.log(randomTextGenerator.validateRight("Boskovice"));
// 0.23636363636363636
```

### validateLeft
Calculates the resemblance of a given word (right -> left) to the words the generator previously learned.
#### Syntax
```js
randomTextGenerator.validateLeft(text, origins, isRaw);
```
- **text** - string or array of strings<br/>
Text to calculate the resemblance of.<br/>
- **origins** - *optional*, array of strings, by default `Object.keys(randomTextGenerator.weightsLeft)`<br/>
Specifies the origins allowed in the generation process<br/>
- **isRaw** - *optional*, boolean, by default `false`<br/>
If `true` the input is not treated like a word, but rather like a part of a word.<br/><br/>
Returns string.

### shrink
An alias for [shrinkBoth](#shrink-both).

### shrinkRight
Reduces the size of the generator's right weights by removing saved substrings that have less occurrences than the `trust` value. May cause negative effects when the dataset the generator used for learning is small, so use it only when neccessary.
#### Syntax
```js
randomTextGenerator.shrink();
// or
randomTextGenerator.shrinkRight();
```
Returns **nothing**.
#### Example
```js
let pets=["Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon"];
for (let pet of pets) randomTextGenerator.learn(pet);

console.log(randomTextGenerator.saveWeightsToJson());
// {"weightsLeft":{},"weightsRight":{"_default":{"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"\u0002Da":{"i":1},"\u0002Dai":{"s":1},"\u0002Dais":{"y":1},"\u0002Daisy":{"\u0003":1},"D":{"a":1,"u":1},"Da":{"i":1},"Dai":{"s":1},"Dais":{"y":1},"Daisy":{"\u0003":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"ais":{"y":1},"aisy":{"\u0003":1},"i":{"s":1,"l":1,"t":1,"m":1},"is":{"y":1},"isy":{"\u0003":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"sy":{"\u0003":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"\u0002Cl":{"e":1},"\u0002Cle":{"o":1},"\u0002Cleo":{"\u0003":1},"C":{"l":1,"h":1,"a":1},"Cl":{"e":1},"Cle":{"o":1},"Cleo":{"\u0003":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"leo":{"\u0003":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"eo":{"\u0003":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"\u0002Ch":{"l":1},"\u0002Chl":{"o":1},"\u0002Chlo":{"e":1},"\u0002Chloe":{"\u0003":1},"Ch":{"l":1},"Chl":{"o":1},"Chlo":{"e":1},"Chloe":{"\u0003":1},"h":{"l":1},"hl":{"o":1},"hlo":{"e":1},"hloe":{"\u0003":1},"lo":{"e":1},"loe":{"\u0003":1},"oe":{"\u0003":1},"\u0002A":{"n":1},"\u0002An":{"g":1},"\u0002Ang":{"e":1},"\u0002Ange":{"l":1},"\u0002Angel":{"\u0003":1},"A":{"n":1},"An":{"g":1},"Ang":{"e":1},"Ange":{"l":1},"Angel":{"\u0003":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"ng":{"e":1},"nge":{"l":1},"ngel":{"\u0003":1},"g":{"e":1},"ge":{"l":1},"gel":{"\u0003":1},"el":{"\u0003":1},"\u0002Du":{"s":1},"\u0002Dus":{"t":1},"\u0002Dust":{"y":1},"\u0002Dusty":{"\u0003":1},"Du":{"s":1},"Dus":{"t":1},"Dust":{"y":1},"Dusty":{"\u0003":1},"u":{"s":1},"us":{"t":1},"ust":{"y":1},"usty":{"\u0003":1},"st":{"y":1},"sty":{"\u0003":1},"t":{"y":1,"t":1,"e":1},"ty":{"\u0003":1},"\u0002B":{"a":1},"\u0002Ba":{"i":1},"\u0002Bai":{"l":1},"\u0002Bail":{"e":1},"\u0002Baile":{"y":1},"\u0002Bailey":{"\u0003":1},"B":{"a":1},"Ba":{"i":1},"Bai":{"l":1},"Bail":{"e":1},"Baile":{"y":1},"Bailey":{"\u0003":1},"ail":{"e":1},"aile":{"y":1},"ailey":{"\u0003":1},"il":{"e":1},"ile":{"y":1},"iley":{"\u0003":1},"ley":{"\u0003":1},"ey":{"\u0003":2},"\u0002M":{"i":1},"\u0002Mi":{"t":1},"\u0002Mit":{"t":1},"\u0002Mitt":{"e":1},"\u0002Mitte":{"n":1},"\u0002Mitten":{"s":1},"\u0002Mittens":{"\u0003":1},"M":{"i":1},"Mi":{"t":1},"Mit":{"t":1},"Mitt":{"e":1},"Mitte":{"n":1},"Mitten":{"s":1},"Mittens":{"\u0003":1},"it":{"t":1},"itt":{"e":1},"itte":{"n":1},"itten":{"s":1},"ittens":{"\u0003":1},"tt":{"e":1},"tte":{"n":1},"tten":{"s":1},"ttens":{"\u0003":1},"te":{"n":1},"ten":{"s":1},"tens":{"\u0003":1},"en":{"s":1},"ens":{"\u0003":1},"ns":{"\u0003":1},"\u0002Ca":{"s":1},"\u0002Cas":{"e":1},"\u0002Case":{"y":1},"\u0002Casey":{"\u0003":1},"Ca":{"s":1},"Cas":{"e":1},"Case":{"y":1},"Casey":{"\u0003":1},"as":{"e":1},"ase":{"y":1},"asey":{"\u0003":1},"se":{"y":1},"sey":{"\u0003":1},"\u0002S":{"o":1,"n":1,"i":1},"\u0002So":{"c":1},"\u0002Soc":{"k":1},"\u0002Sock":{"s":1},"\u0002Socks":{"\u0003":1},"S":{"o":1,"n":1,"i":1},"So":{"c":1},"Soc":{"k":1},"Sock":{"s":1},"Socks":{"\u0003":1},"oc":{"k":1},"ock":{"s":1},"ocks":{"\u0003":1},"c":{"k":1},"ck":{"s":1},"cks":{"\u0003":1},"k":{"s":1},"ks":{"\u0003":1},"\u0002Sn":{"o":1},"\u0002Sno":{"w":1},"\u0002Snow":{"b":1},"\u0002Snowb":{"a":1},"\u0002Snowba":{"l":1},"\u0002Snowbal":{"l":1},"\u0002Snowball":{"\u0003":1},"Sn":{"o":1},"Sno":{"w":1},"Snow":{"b":1},"Snowb":{"a":1},"Snowba":{"l":1},"Snowbal":{"l":1},"Snowball":{"\u0003":1},"no":{"w":1},"now":{"b":1},"nowb":{"a":1},"nowba":{"l":1},"nowbal":{"l":1},"nowball":{"\u0003":1},"ow":{"b":1},"owb":{"a":1},"owba":{"l":1},"owbal":{"l":1},"owball":{"\u0003":1},"w":{"b":1},"wb":{"a":1},"wba":{"l":1},"wbal":{"l":1},"wball":{"\u0003":1},"b":{"a":1},"ba":{"l":1},"bal":{"l":1},"ball":{"\u0003":1},"al":{"l":1},"all":{"\u0003":1},"ll":{"\u0003":1},"\u0002Si":{"m":1},"\u0002Sim":{"o":1},"\u0002Simo":{"n":1},"\u0002Simon":{"\u0003":1},"Si":{"m":1},"Sim":{"o":1},"Simo":{"n":1},"Simon":{"\u0003":1},"im":{"o":1},"imo":{"n":1},"imon":{"\u0003":1},"m":{"o":1},"mo":{"n":1},"mon":{"\u0003":1},"on":{"\u0003":1}}}}
randomTextGenerator.shrink(); // Do not use shrink() when the dataset is that small!
console.log(randomTextGenerator.saveWeightsToJson());
// {"weightsLeft":{},"weightsRight":{"_default":{"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"D":{"a":1,"u":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"i":{"s":1,"l":1,"t":1,"m":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"C":{"l":1,"h":1,"a":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"t":{"y":1,"t":1,"e":1},"ey":{"\u0003":2},"\u0002S":{"o":1,"n":1,"i":1},"S":{"o":1,"n":1,"i":1}}}}
```

### shrinkRight
Reduces the size of the generator's right weights by removing saved substrings that have less occurrences than the `trust` value. May cause negative effects when the dataset the generator used for learning is small, so use it only when neccessary.
#### Syntax
```js
randomTextGenerator.shrinkLeft();
```
Returns **nothing**.

### shrinkBoth
Reduces the size of the generator's right and left weights by removing saved substrings that have less occurrences than the `trust` value. May cause negative effects when the dataset the generator used for learning is small, so use it only when neccessary.
#### Syntax
```js
randomTextGenerator.shrinkBoth();
```
Returns nothing.
### saveToJson
Saves the generator parameters and weights to a json.
The json can be later loaded using [loadFromJson](#load-from-json).
#### Syntax
```js
randomTextGenerator.saveToJson();
```
Returns string.
#### Example
```js
let pets=["Daisy", "Cleo", "Chloe", "Angel", "Dusty", "Bailey", "Mittens", "Casey", "Socks", "Snowball", "Simon"];
for (let pet of pets) randomTextGenerator.learn(pet);

console.log(randomTextGenerator.saveToJson());
//{"tries":80,"safeMode":true,"forceCombiningOrigins":false,"minLength":1,"maxLength":400,"deepness":40,"trust":2,"weightsLeft":{},"weightsRight":{"_default":{"\u0002":{"D":2,"C":3,"A":1,"B":1,"M":1,"S":3},"\u0002D":{"a":1,"u":1},"\u0002Da":{"i":1},"\u0002Dai":{"s":1},"\u0002Dais":{"y":1},"\u0002Daisy":{"\u0003":1},"D":{"a":1,"u":1},"Da":{"i":1},"Dai":{"s":1},"Dais":{"y":1},"Daisy":{"\u0003":1},"a":{"i":2,"s":1,"l":1},"ai":{"s":1,"l":1},"ais":{"y":1},"aisy":{"\u0003":1},"i":{"s":1,"l":1,"t":1,"m":1},"is":{"y":1},"isy":{"\u0003":1},"s":{"y":1,"t":1,"\u0003":2,"e":1},"sy":{"\u0003":1},"y":{"\u0003":4},"\u0002C":{"l":1,"h":1,"a":1},"\u0002Cl":{"e":1},"\u0002Cle":{"o":1},"\u0002Cleo":{"\u0003":1},"C":{"l":1,"h":1,"a":1},"Cl":{"e":1},"Cle":{"o":1},"Cleo":{"\u0003":1},"l":{"e":2,"o":1,"\u0003":2,"l":1},"le":{"o":1,"y":1},"leo":{"\u0003":1},"e":{"o":1,"\u0003":1,"l":1,"y":2,"n":1},"eo":{"\u0003":1},"o":{"\u0003":1,"e":1,"c":1,"w":1,"n":1},"\u0002Ch":{"l":1},"\u0002Chl":{"o":1},"\u0002Chlo":{"e":1},"\u0002Chloe":{"\u0003":1},"Ch":{"l":1},"Chl":{"o":1},"Chlo":{"e":1},"Chloe":{"\u0003":1},"h":{"l":1},"hl":{"o":1},"hlo":{"e":1},"hloe":{"\u0003":1},"lo":{"e":1},"loe":{"\u0003":1},"oe":{"\u0003":1},"\u0002A":{"n":1},"\u0002An":{"g":1},"\u0002Ang":{"e":1},"\u0002Ange":{"l":1},"\u0002Angel":{"\u0003":1},"A":{"n":1},"An":{"g":1},"Ang":{"e":1},"Ange":{"l":1},"Angel":{"\u0003":1},"n":{"g":1,"s":1,"o":1,"\u0003":1},"ng":{"e":1},"nge":{"l":1},"ngel":{"\u0003":1},"g":{"e":1},"ge":{"l":1},"gel":{"\u0003":1},"el":{"\u0003":1},"\u0002Du":{"s":1},"\u0002Dus":{"t":1},"\u0002Dust":{"y":1},"\u0002Dusty":{"\u0003":1},"Du":{"s":1},"Dus":{"t":1},"Dust":{"y":1},"Dusty":{"\u0003":1},"u":{"s":1},"us":{"t":1},"ust":{"y":1},"usty":{"\u0003":1},"st":{"y":1},"sty":{"\u0003":1},"t":{"y":1,"t":1,"e":1},"ty":{"\u0003":1},"\u0002B":{"a":1},"\u0002Ba":{"i":1},"\u0002Bai":{"l":1},"\u0002Bail":{"e":1},"\u0002Baile":{"y":1},"\u0002Bailey":{"\u0003":1},"B":{"a":1},"Ba":{"i":1},"Bai":{"l":1},"Bail":{"e":1},"Baile":{"y":1},"Bailey":{"\u0003":1},"ail":{"e":1},"aile":{"y":1},"ailey":{"\u0003":1},"il":{"e":1},"ile":{"y":1},"iley":{"\u0003":1},"ley":{"\u0003":1},"ey":{"\u0003":2},"\u0002M":{"i":1},"\u0002Mi":{"t":1},"\u0002Mit":{"t":1},"\u0002Mitt":{"e":1},"\u0002Mitte":{"n":1},"\u0002Mitten":{"s":1},"\u0002Mittens":{"\u0003":1},"M":{"i":1},"Mi":{"t":1},"Mit":{"t":1},"Mitt":{"e":1},"Mitte":{"n":1},"Mitten":{"s":1},"Mittens":{"\u0003":1},"it":{"t":1},"itt":{"e":1},"itte":{"n":1},"itten":{"s":1},"ittens":{"\u0003":1},"tt":{"e":1},"tte":{"n":1},"tten":{"s":1},"ttens":{"\u0003":1},"te":{"n":1},"ten":{"s":1},"tens":{"\u0003":1},"en":{"s":1},"ens":{"\u0003":1},"ns":{"\u0003":1},"\u0002Ca":{"s":1},"\u0002Cas":{"e":1},"\u0002Case":{"y":1},"\u0002Casey":{"\u0003":1},"Ca":{"s":1},"Cas":{"e":1},"Case":{"y":1},"Casey":{"\u0003":1},"as":{"e":1},"ase":{"y":1},"asey":{"\u0003":1},"se":{"y":1},"sey":{"\u0003":1},"\u0002S":{"o":1,"n":1,"i":1},"\u0002So":{"c":1},"\u0002Soc":{"k":1},"\u0002Sock":{"s":1},"\u0002Socks":{"\u0003":1},"S":{"o":1,"n":1,"i":1},"So":{"c":1},"Soc":{"k":1},"Sock":{"s":1},"Socks":{"\u0003":1},"oc":{"k":1},"ock":{"s":1},"ocks":{"\u0003":1},"c":{"k":1},"ck":{"s":1},"cks":{"\u0003":1},"k":{"s":1},"ks":{"\u0003":1},"\u0002Sn":{"o":1},"\u0002Sno":{"w":1},"\u0002Snow":{"b":1},"\u0002Snowb":{"a":1},"\u0002Snowba":{"l":1},"\u0002Snowbal":{"l":1},"\u0002Snowball":{"\u0003":1},"Sn":{"o":1},"Sno":{"w":1},"Snow":{"b":1},"Snowb":{"a":1},"Snowba":{"l":1},"Snowbal":{"l":1},"Snowball":{"\u0003":1},"no":{"w":1},"now":{"b":1},"nowb":{"a":1},"nowba":{"l":1},"nowbal":{"l":1},"nowball":{"\u0003":1},"ow":{"b":1},"owb":{"a":1},"owba":{"l":1},"owbal":{"l":1},"owball":{"\u0003":1},"w":{"b":1},"wb":{"a":1},"wba":{"l":1},"wbal":{"l":1},"wball":{"\u0003":1},"b":{"a":1},"ba":{"l":1},"bal":{"l":1},"ball":{"\u0003":1},"al":{"l":1},"all":{"\u0003":1},"ll":{"\u0003":1},"\u0002Si":{"m":1},"\u0002Sim":{"o":1},"\u0002Simo":{"n":1},"\u0002Simon":{"\u0003":1},"Si":{"m":1},"Sim":{"o":1},"Simo":{"n":1},"Simon":{"\u0003":1},"im":{"o":1},"imo":{"n":1},"imon":{"\u0003":1},"m":{"o":1},"mo":{"n":1},"mon":{"\u0003":1},"on":{"\u0003":1}}},"splitter":"","startingCharacter":"\u0002","endingCharacter":"\u0003"}
```

### loadFromJson
Loads the generator parameters and weights from a json.
The json can be obtained from [saveToJson](#save-to-json).
#### Syntax
```js
randomTextGenerator.loadFromJson(json);
```
- **json** - json string<br/><br/>
Returns nothing.

### saveWeightsToJson
Saves the generator weights to a json.
The json can be later loaded using [loadWeightsFromJson](#load-weights-from-json).
#### Syntax
```js
randomTextGenerator.saveWeightsToJson();
```
Returns string.

### loadWeightsFromJson
Loads the generator weights from a json.
The json can be obtained from [saveWeightsToJson](#save-weights-to-json).
#### Syntax
```js
randomTextGenerator.loadWeightsFromJson(json);
```
```json``` - string.
The generator's weights saved in the json format.<br/><br/>
Returns nothing.
#### Example
```js
randomTextGenerator.loadWeightsFromJson(String.raw`{"weightsLeft":{},"weightsRight":{"_default":{"1":{"2":1,"3":1,"6":1,"\u0003":2},"2":{"1":1,"2":1},"3":{"3":1,"7":1},"\u0002":{"i":2,"B":1,"k":2,"P":1,"b":1,"E":1,"D":1,"K":1,"p":1,"G":2,"A":1,"M":3,"g":1,"F":1,"Y":1,"d":1},"\u0002i":{"p":1,"c":1},"i":{"p":1,"o":2,"\u0003":2,"c":3,"g":2,"b":1,"a":1," ":1,"r":1,"t":1},"p":{"o":1,"p":1,"a":1,"e":1},"o":{"c":1,"s":4,"o":2,"l":1,"\u0003":1,"n":1,"z":1,"t":1,"b":1},"c":{"a":1,"h":3,"r":2},"a":{"1":1,"k":1,"\u0003":2,"a":2,"r":2,"p":1,"O":1,"m":1,"z":1,"l":1,"x":1},"k":{"\u0003":2,"o":1,"e":1,"u":1},"B":{"o":1,"e":1},"os":{"z":1,"a":1,"w":1,"\u0003":1},"s":{"z":1,"a":1,"y":1,"w":1,"\u0003":1,"t":1,"h":1},"z":{"e":1,"i":1,"\u0003":1,"a":1},"e":{"k":1,"q":1,"i":1,"w":1,"l":1,"x":1,"a":1,"\u0003":1,"r":1},"\u0002k":{"o":1,"u":1},"P":{"s":1,"L":1},"ch":{"a":2,"i":1},"cha":{"a":1,"l":1},"h":{"a":2,"i":1,"e":1},"ha":{"a":1,"l":1},"aa":{"1":1,"\u0003":1},"b":{"o":2,"e":2,"i":1},"bo":{"o":1,"b":1},"oo":{"s":2},"oos":{"w":1,"\u0003":1},"w":{"o":2},"wo":{"o":1,"z":1},"io":{"l":1,"t":1},"l":{"1":1,"e":2,"a":1},"le":{"q":1,"x":1},"ar":{"k":1,"\u0003":1},"r":{"1":1,"k":1,"o":1,"A":1,"t":1,"\u0003":2,"i":1,"s":1,"u":1},"ic":{"h":2,"r":1},"ich":{"i":1,"a":1},"ig":{"o":1,"i":1},"g":{"o":1,".":1,"i":1},"m":{"i":2},"mi":{"c":1," ":1},"cr":{"o":1,"u":1},"u":{"b":1,"r":1,"s":1},"be":{"l":1,"\u0003":1},"\u0002G":{"i":1,"H":1},"G":{"i":1,"H":1},"A":{"l":1,"r":1},"x":{"\u0003":1,"_":1},"\u0002M":{"r":1,"i":2},"M":{"r":1,"i":2},"t":{"u":1,"\u0003":1,"b":1,"c":1},"\u0002Mi":{"a":1,"c":1},"Mi":{"a":1,"c":1}}}}`);

for (let i=0; i<12; ++i) {
	console.log(randomTextGenerator.generate());
}
// Michibooswoze
// gochalaa
// Boswoz
// Gigobooswoos
// kubobe
// kushaa
// Michaa
// Pshalakosaa
// Michichi
// Giotubel1221
// Pshipppppape
// kooswoos
```