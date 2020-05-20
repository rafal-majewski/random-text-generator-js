# random-text-generator-js UPGRADING FROM V2 TO V3
Temporarily this is the way to initialize the generator:
```js
// V3
const RandomTextGenerator=require("random-text-generator")({legacy: false});
let randomTextGenerator=new RandomTextGenerator(settings);

// V2 (legacy)
const createRandomTextGenerator=require("random-text-generator");
let randomTextGenerator=createRandomTextGenerator(settings);
```

`randomTextGenerator.limit` has been replaced with `randomTextGenerator.minLength` and `randomTextGenerator.maxLength`.

`randomTextGenerator.multiplier` has been removed. From now on every time you teach the generator a new example you have to specify the multiplier of this very example (or leave undefined/null for the default value of 1). 

`randomTextGenerator.weights` has been replaced with `randomTextGenerator.weightsLeft` and `randomTextGenerator.weightsRight` in order to support bothways generation.
Additionally the *origin* feature has been added, so if you want to load weights from v2 in v3 you have you set
`randomTextGeneratorV3.weightsRight._default=randomTextGeneratorV2.weights`.

`randomTextGenerator.learnExample(example, isRaw)` has been replaced with `randomTextGenerator.learn(example, origin, multiplier, isRaw)` and you no longer have you pass arrays as `example`, strings are also accepted from now on.

`randomTextGenerator.forgetExample(example, isRaw)` has been replaced with `randomTextGenerator.forget(example, origin, multiplier, isRaw)` and you no longer have you pass arrays as `example`, strings are also accepted from now on.

Both `randomTextGenerator.learnExamples(examples, isRaw)` and `randomTextGenerator.forgetExamples(examples, isRaw)` have been removed.

`randomTextGenerator.predictCharacter(splittedText)` is now `randomTextGenerator.predict(text, origins, isRaw, obeyLimit)`.

`randomTextGenerator.lengthen(splittedWord)` and `randomTextGenerator.generate()` have been merged into `randomTextGenerator.generate(text, origins, isRaw)`. You can pass the desired beginning as the first parameter.