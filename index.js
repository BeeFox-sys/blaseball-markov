const fs = require("fs");


const toGenerate = 10;
const nameLength = 50;
const chainSize = 3; 


function markovChainGenerator(text) {
    // console.log(text)
    const textArr = text.toLowerCase().replace(/[\r\n]+/g," ").split('')
    // console.log(textArr)
    const markovChain = {};
    for (let i = 0; i < textArr.length; i++) {
        let chars = textArr.slice(i,i+chainSize).join("")
        // console.log(chars)
        if (! markovChain[chars]) {
            markovChain[chars] = []
        }
        if (textArr[i + 1]) {
            markovChain[chars].push(textArr[i + chainSize]);
        }
    }
    return markovChain
}

function text(){
    let chain = markovChainGenerator(fs.readFileSync("./PlayerNames.txt", 'utf8'))
    const chars = Object.keys(chain)
    let char = chars[Math.floor(Math.random() * chars.length)]
    // while(true){
    let result = '';
    let breaks = 0;
    for(let i = 0; i < nameLength; i++){
        result += char + '';
        last = result.substr(result.length-chainSize)
        newChar =  chain[last][Math.floor(Math.random() * chain[last].length)]
        if(newChar == ' ') breaks++;
        if(breaks == 2) break;
        char = newChar;
        // console.log(result)
      }
    return result.trim();
}

// let res = []
// for(let i = 0; i<toGenerate; i++){
//     res.push(text())
// }
// console.log(res.join("\n"))


var chain = JSON.stringify(markovChainGenerator(fs.readFileSync("./PlayerNames.txt", 'utf8'))); 

fs.writeFile("chain.json", chain, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("Updated Chain");
}); 