const fs = require('fs');

const func = require( './function' );
const settings = require( './setings' );

for (let i=0; i < settings.other.global.numberRecord; i++) {
    console.log('--------------');
    const choiceGender = func.randChoice(settings.array.date.gender);
    console.log('choiceGender: ', choiceGender);

    const choiceName = func.randName(choiceGender);
    console.log('choiceName: ', choiceName);
    
    const choiceLastName = func.randChoice(settings.array.date.lastNames);
    console.log('choiceLastName: ', choiceLastName);

    const choiceAge = func.randAge();
    console.log('choiceAge: ', choiceAge);

    const choiceMail = func.mailCreation(choiceName, choiceLastName, settings.array.date.domen, settings.array.date.mail);
    settings.array.date.mail.push(choiceMail);
    console.log('choiceMail: ', choiceMail);

    const choiceNumber = func.randNumber();
    console.log('choiceNumber: ', choiceNumber);

    const choicePESEL = func.randPESEL (choiceGender, choiceAge);
    console.log('choicePESEL: ', choicePESEL);

    settings.array.date.people.push({
        name: choiceName,
        lastName: choiceLastName,
        gender: choiceGender,
        age: choiceAge,
        mail: choiceMail,
        phoneNumber: choiceNumber,
        PESEL: choicePESEL,
    });

}
console.log('people: ', settings.array.date.people);

const peopleJSON = JSON.stringify(settings.array.date.people);

fs.writeFile('people.json', peopleJSON, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });