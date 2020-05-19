const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

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