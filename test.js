// const TextGenerator=require("./random_text_generator_node.js");

// let generator=new TextGenerator();
// // `Kołotun
// // bartex004
// // Ciemny_diabeł
// // rumbus
// // KonZwi <3 Catty
// // Marco 112
// // ankaa13
// // darkie
// // The Forgetten
// // Kaczuszka
// // kun leviv
// // Marcineł
// // XavenPK
// // lukis
// // kapi_222
// // kacper
// // Rodanjeden
// // KoYteK
// // michau
// // memiarz Kacpra
// // tonipolek
// // You are a joke for me
// // Cloak
// // Jakucho.
// // Przemx
// // tarhunt 82
// // TaeTae
// // goofy
// // Pysio8190
// // albertone777
// // sas334
// // pioter
// // Gabby
// // IVER
// // barteloo
// // MordoklejkaJa
// // Grzyben11
// // majczaq190
// // shandow43
// // nikom_2009
// // Andy1902
// // DoitsuMan
// // BOB TELETUBIŚ
// // poleju
// // Pyrzan06
// // OGAR YOUTUBER
// // Emi
// // Kfiutek
// // RajczuX RX
// // foxyt221
// // - RKesio -
// // piesel1231234lol
// // PanJabluszko129
// // Kasia990
// // Straszydeł
// // Mi Mar
// // Doge
// // ludiiowo
// // Mysza
// // PAY_A1K
// // mslol
// // Artex_112
// // michalgold
// // tFabiś11t
// // GŻEŚÓ 2
// // kookoo
// // PoofyRatAJPW
// // 4NG3L
// // bartix100000
// // bulbazaur999
// // Ferskeren
// // Red Fox
// // Mikolajio
// // twerty870
// // Turamisus
// // Cayman
// // krulik123
// // MyszonDoge2010
// // Mateszyzna/pl
// // Queen
// // melis
// // M4JAMI
// // 12shizeR
// // LeMarcinek Pl
// // BobcioBobcio
// // justynka
// // patrykgeming
// // Miko26Pl
// // Pan_Prezes_1
// // ZZOMBIS
// // John.y
// // PioterXD
// // PompaTeam108
// // abes_85
// // Radziosz
// // UnnamedPlayer
// // Love_Alicja_Cat
// // MAciunko709
// // Joszko
// // mustanggt1231
// // karlitto.pl
// // xDORISAx
// // mchcbc
// // Steve Fox
// // karolkart
// // Kaszak_Anka
// // Ajm Soł Faking Soviet
// // Dawid_Games
// // Werqa
// // Lukiqq
// // sekunda.s
// // Hns_fort_szymix
// // BlackWiki
// // $ako
// // DraGoNeq PL
// // janjanjansp10
// // RetroGracz
// // Macianka Rainbowdash
// // Saqacz
// // KiciaTV
// // Tantal
// // Chilmsil
// // Sergiusz Serowy
// // faperson.
// // Synek
// // ReX
// // only ratowanie
// // krzysiu5500
// // $zymson28
// // Kubz
// // Finicky Diamond 3
// // Mateusz Klas
// // Karix
// // Xrall2555
// // biały bez
// // Charlotte
// // saper_xd
// // DJ Szpachla
// // tumon123456789
// // Mememaker11
// // WładcaCię
// // nie mam pomysłu
// // Xxfilipoo676xX`.split("\n").forEach((nickname)=>{generator.learn(nickname);})

// let pets=["StinkyPoop", "Alextron234", "BattleDash", "berkey10", "Ezblox23", "robiko858", "zakizakowski", "MrArtur1337", "AzisDeus", "AustrianPainter1889", "pomidorek2pl", "JoeMamma", "MafiaBoss75", "SciManDan", "siuras_ogoras986", "jacob.flix", "malario", "BenDrowned", "pickupthefox", "okboomer"];
// for (let pet of pets) generator.learn(pet);

// for (let i=0; i<10; ++i) {
// 	console.log(generator.generate());
// }

const RandomTextGenerator=require("./random_text_generator_node");

let randomTextGenerator= new RandomTextGenerator({legacy: false})();

randomTextGenerator.learn("Mark");
randomTextGenerator.learn("Henry");
randomTextGenerator.learn("Bob");
randomTextGenerator.learn("John");
randomTextGenerator.learn("David");
 
for (let i=0; i<12; ++i) {
    let name=randomTextGenerator.generate();
    console.log(name);
}