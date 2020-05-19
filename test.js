const RandomTextGenerator=require("./random_text_generator_node.js")({legacy: false});
let randomTextGenerator=new RandomTextGenerator();


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