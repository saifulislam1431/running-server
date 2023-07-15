
// const encryptString = (string) => {

//     let newValue = 0
//    const asciiValue = string.charCodeAt(string)

//    newValue = asciiValue + 1;
//     const newString = String.fromCharCode(newValue);
//     return newString;


// }

// const result = encryptString("s");
// console.log(result);

// const replaceText = (text) => {
//     let newText = "";
//     if(text === "replaceme"){
//         newText = "replaced"
//     }
//     return newText;
// }
// const text = replaceText("replaceme")
// console.log(text);

// const checkUpperCase = (string) => {

//     for(const characters of string ){
//         return characters.toUpperCase() === characters && characters.toLowerCase() !== characters
//     }

// }
// const text = checkUpperCase("aeplaceEe")
// console.log(text);

const randomGen = (max , min) =>{
    return Math.floor(Math.random() * (max-min)) + min
}

const theNum = randomGen(0 , 5)
console.log(theNum);