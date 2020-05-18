const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

randomTextGenerator.learnRight("Mark");
randomTextGenerator.learnRight("Henry");
randomTextGenerator.learnRight("Bob");
randomTextGenerator.learnRight("John");
randomTextGenerator.learn("David"); // randomTextGenerator.learn is an alias for randomTextGenerator.learnRight.

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}