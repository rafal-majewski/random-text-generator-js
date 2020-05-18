const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

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