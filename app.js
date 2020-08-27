const fs = require('fs');

const func = require( './function' );
const set = require( './setings' );

for (let i=0; i < set.numberRecord; i++) {
    console.log('--------------');
    const choiceGender = func.randChoice(set.gender);
    console.log('choiceGender: ', choiceGender);

    const choiceName = func.randName(choiceGender);
    console.log('choiceName: ', choiceName);
    
    const choiceLastName = func.randChoice(set.lastNames);
    console.log('choiceLastName: ', choiceLastName);

    const choiceAge = func.randAge();
    console.log('choiceAge: ', choiceAge);

    const choiceMail = func.mailCreation(choiceName, choiceLastName, set.domen, set.mail);
    set.mail.push(choiceMail);
    console.log('choiceMail: ', choiceMail);

    const choiceNumber = func.randNumber();
    console.log('choiceNumber: ', choiceNumber);

    const choicePESEL = func.randPESEL (choiceGender, choiceAge);
    console.log('choicePESEL: ', choicePESEL);

    set.people.push({
        name: choiceName,
        lastName: choiceLastName,
        gender: choiceGender,
        age: choiceAge,
        mail: choiceMail,
        phoneNumber: choiceNumber,
        PESEL: choicePESEL,
    });

}
console.log('people: ', set.people);

const peopleJSON = JSON.stringify(set.people);

fs.writeFile('people.json', peopleJSON, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });