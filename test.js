const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

randomTextGenerator.learn("Dallas");
randomTextGenerator.learn("Austin");
randomTextGenerator.learn("Chicago");
randomTextGenerator.learn("Seattle");
randomTextGenerator.learn("Denver");
randomTextGenerator.learn("Boston");
randomTextGenerator.learn("Washington");
randomTextGenerator.learn("Vancouver");

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate("h");
	console.log(name);
}
// Johnry
// Bohnry
// Bohnrk
// John

for (let i=0; i<4; ++i) {
	let name=randomTextGenerator.generate("a");
	console.log(name);
}
// Mamen
// Mames
// David
// Mavid