createRandomTextGenerator=(settings)=>{
	let randomTextGenerator={deepness: 40, trust: 2, weights: {}, splitter: "", limit: 400, startingCharacter: String.fromCharCode(2), endingCharacter: String.fromCharCode(3)};
	randomTextGenerator={...randomTextGenerator, ...settings};
	randomTextGenerator.learnExample=(example, isRaw)=>{
		example=[...((isRaw)?(""):(randomTextGenerator.startingCharacter)), ...example, ...((isRaw)?(""):(randomTextGenerator.endingCharacter))];
		for (let i=0; i<example.length-1; ++i) {
			for (let i2=i; i2<Math.min(example.length-1, i+randomTextGenerator.deepness); ++i2) {
				let from=example.slice(i, i2+1).join(randomTextGenerator.splitter);
				let to=example[i2+1];
				if (!randomTextGenerator.weights[from]) randomTextGenerator.weights[from]={};
				if (!randomTextGenerator.weights[from][to]) randomTextGenerator.weights[from][to]=0;
				++randomTextGenerator.weights[from][to];
			}
		}
	};
	randomTextGenerator.forgetExample=(example, isRaw)=>{
		example=[...((isRaw)?(""):(randomTextGenerator.startingCharacter)), ...example, ...((isRaw)?(""):(randomTextGenerator.endingCharacter))];
		for (let i=0; i<example.length-1; ++i) {
			for (let i2=i; i2<Math.min(example.length-1, i+randomTextGenerator.deepness); ++i2) {
				let from=example.slice(i, i2+1).join(randomTextGenerator.splitter);
				let to=example[i2+1];
				if (!randomTextGenerator.weights[from]) randomTextGenerator.weights[from]={};
				if (!randomTextGenerator.weights[from][to]) randomTextGenerator.weights[from][to]=0;
				--randomTextGenerator.weights[from][to];
				if (randomTextGenerator.weights[from][to] == 0) delete randomTextGenerator.weights[from][to];
				if (Object.keys(randomTextGenerator.weights[from]).length == 0) delete randomTextGenerator.weights[from];
			}
		}
	};
	randomTextGenerator.forgetExamples=(examples, isRaw)=>{
		if (examples) for (let example of examples) randomTextGenerator.forgetExample(example);
		else randomTextGenerator.weights={};
	};
	randomTextGenerator.learnExamples=(examples, isRaw)=>{
		for (let example of examples) randomTextGenerator.learnExample(example, isRaw);
	};
	randomTextGenerator.predictCharacter=(splittedText)=>{
		let from=splittedText.slice(Math.max(0, splittedText.length-randomTextGenerator.deepness));
		for (let i=0; i<randomTextGenerator.deepness; ++i) {
			let weightsRow=randomTextGenerator.weights[from.join(randomTextGenerator.splitter)];
			if (weightsRow) {
				let sum=0;
				for (let to of Object.keys(weightsRow)) sum+=weightsRow[to];
				if (sum >= randomTextGenerator.trust) {
					let pick=Math.random()*sum;
					for (let to of Object.keys(weightsRow)) {
						pick-=weightsRow[to];
						if (pick < 0) return to;
					}
				}
			}
			from=from.slice(1);
		}
		from=splittedText.slice(Math.max(0, splittedText.length-randomTextGenerator.deepness));
		for (let i=0; i<randomTextGenerator.deepness; ++i) {
			let weightsRow=randomTextGenerator.weights[from.join(randomTextGenerator.splitter)];
			if (weightsRow) {
				let sum=0;
				for (let to of Object.keys(weightsRow)) sum+=weightsRow[to];
				let pick=Math.random()*sum;
				for (let to of Object.keys(weightsRow)) {
					pick-=weightsRow[to];
					if (pick < 0) return to;
				}
			}
			from=from.slice(1);
		}
	};
	randomTextGenerator.generate=()=>{
		let splittedText=[randomTextGenerator.startingCharacter];
		while (true) {
			let character=randomTextGenerator.predictCharacter(splittedText);
			if (character === randomTextGenerator.endingCharacter) break;
			if (!character || splittedText.length > randomTextGenerator.limit) {
				splittedText=[randomTextGenerator.startingCharacter];
				continue;
			}
			splittedText.push(character);
		}
		return splittedText.slice(1);
	};
	randomTextGenerator.lengthen=(splittedText)=>{
		let newSplittedText=[...splittedText];
		while (true) {
			let character=randomTextGenerator.predictCharacter(newSplittedText);
			if (character === randomTextGenerator.endingCharacter) break;
			if (!character || newSplittedText.length > randomTextGenerator.limit) {
				newSplittedText=[...splittedText];
				continue;
			}
			newSplittedText.push(character);
		}
		return newSplittedText;
	};
	randomTextGenerator.shrink=()=>{
		for (let from of Object.keys(randomTextGenerator.weights)) {
			let weightsRow=randomTextGenerator.weights[from];
			let sum=0;
			for (let to of Object.keys(weightsRow)) sum+=weightsRow[to];
			if (sum < randomTextGenerator.trust) delete randomTextGenerator.weights[from];
		}
	};
	randomTextGenerator.saveToJson=()=>(JSON.stringify(randomTextGenerator));
	randomTextGenerator.loadFromJson=(json)=>{randomTextGenerator={...JSON.parse(json), ...randomTextGenerator}};
	randomTextGenerator.saveWeightsToJson=()=>(JSON.stringify(randomTextGenerator.weights));
	randomTextGenerator.loadWeightsFromJson=(json)=>{randomTextGenerator.weights=JSON.parse(json)};
	return randomTextGenerator;
	
};
