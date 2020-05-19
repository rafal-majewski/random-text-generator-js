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

randomTextGenerator.forget("Dallas");
randomTextGenerator.forget("Detroit");
randomTextGenerator.forget("Denver");
randomTextGenerator.forget("Boston");
randomTextGenerator.forget("Beaumont");
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