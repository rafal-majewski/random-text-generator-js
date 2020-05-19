const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

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