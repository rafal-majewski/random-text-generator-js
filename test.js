const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();

randomTextGenerator.learnRight("Mark");
randomTextGenerator.learnRight("Henry");
randomTextGenerator.learnRight("Bob");
randomTextGenerator.learnRight("John");
randomTextGenerator.learnRight("David");

for (let i=0; i<12; ++i) {
	let name=randomTextGenerator.generate();
	console.log(name);
}
// Dary
// John
// Job
// Mavid
// Bob
// Henry
// Hen
// Dark
// Mavid
// Henry
// Henrk
// Mary