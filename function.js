const settings = require( './setings' );

randChoice = arr => {
    const arrLength = arr.length;
    const randomNumber = Math.floor(Math.random() * arrLength);
    const randomElem = arr[randomNumber];
    return randomElem
}
exports.randChoice = randChoice;

exports.randName = randName = arr => {
    if (arr == 'k') {
        const choiceName = randChoice(settings.array.date.femaleNames);
        return choiceName;
    }
    if (arr == 'm') {
        const choiceName = randChoice(settings.array.date.maleNames);
        return choiceName;
    }
    else {
        return 'błąd płci'
    }
}

exports.randAge = randAge = () => {
    const randAge = Math.floor(Math.random() * 50 + settings.other.age.minAge);
    return randAge
}

exports.mailCreation = mailCreation = (choiceName, choiceLastName, domen, mail) => {
    const choiceDomen = randChoice(domen);
    const choiceMail = choiceName.toLowerCase() + '.' + choiceLastName.toLowerCase() + '@' + choiceDomen;
    const choiceReversMail = choiceLastName.toLowerCase() + '.' + choiceName.toLowerCase() + '@' + choiceDomen;
    if (mail.indexOf(choiceMail) == -1) {
        return choiceMail;
    }
    if (mail.indexOf(choiceMail) !== -1 && mail.indexOf(choiceReversMail) == -1) {
            return choiceReversMail;
        }
    if (mail.indexOf(choiceMail) !== -1 && mail.indexOf(choiceReversMail) !== -1) {
        const mailLength = mail.length;
        let i = 0;

        while (i < mailLength) {
            i ++;
            const choiceMailWithNumber = choiceName.toLowerCase() + '.' + choiceLastName.toLowerCase() + i + '@' + choiceDomen;
            if (mail.indexOf(choiceMailWithNumber) !== -1) {
                console.log('mail istnieje już w bazie'); 
            }
            else {
                return choiceMailWithNumber;
            }
        }   
    }
    else { 
        Console.log('przypadek do weryfikacji')
    }
}

exports.randNumber = randNumber = () => {
    const phoneNumberArray = [];

    for (let i=0; i < 9; i++) {
        const randNumber = Math.floor(Math.random() * 9);
        phoneNumberArray.push(randNumber);
    }
    const phoneNumberWithCommas = phoneNumberArray.join();
    const phoneNumber = phoneNumberWithCommas .replace(/,/g, "");
    const finallyPhoneNumber = phoneNumber.slice(0,3) + settings.other.phone.PhoneNumberSeparator + phoneNumber.slice(3,6) + settings.other.phone.PhoneNumberSeparator + phoneNumber.slice(6,9)
    return finallyPhoneNumber
}

exports.randPESEL = randPESEL = (choiseGender, choiceAge) => {

    const PESEL = [];
    const resultArray = [];

    let month = 0;
    let randDay = 0;
    let day = 0;
    let sex = 0;
    let sumControl = 0;

    // number 1-2 (year)
    const now = new Date;
    const fullYear = (now.getFullYear() - choiceAge).toString();
    const year = fullYear.slice(2,4);

    //number 3-4 (month)
    const randMonth = Math.floor(Math.random() * 12 + 1);

    if (fullYear < 1900) {
        month = (randMonth + 80).toString();
    }
    if (fullYear > 2000) {
        month = (randMonth + 20).toString();
    }
    else {
        if (randMonth < 10) {
            month = '0' + randMonth.toString();
        } else { 
            month = randMonth.toString();
        }
    } 
    
    //number 5-6 (day)

    if (randMonth == 2) {
        if ((fullYear/4).toString().indexOf('.') == -1) {
            randDay = Math.floor(Math.random() * 28 + 1);
        }
        else {
            randDay = Math.floor(Math.random() * 29 + 1);
        }
    }
    if (randMonth == 4 || randMonth == 6 || randMonth == 9 || randMonth == 11) {
        randDay = Math.floor(Math.random() * 30 + 1);
    }
    else {
        randDay = Math.floor(Math.random() * 30 + 1);
    }
    

    if (randDay < 10) {
        day = '0' + randDay.toString();
    } else { 
        day = randDay.toString();
    }

    PESEL.push(year[0], year[1], month[0], month[1], day[0], day[1]);

    //number 7-9 (day)

    for (let i=0; i < 3; i++) {
       const randNumber = Math.floor(Math.random() * 9 + 1);
       PESEL.push(randNumber.toString());
    }

    //number 10 (sex)

    if (choiseGender == 'k') {
        sex = randChoice(settings.array.PESEL.femaleNumber);
    }
    else {
        sex = randChoice(settings.array.PESEL.maleNumber);
    }
    PESEL.push(sex.toString());

    //number 11 (control)
    for ( let i = 0; i < 10; i++) {
        const result = PESEL[i] * settings.array.PESEL.key[i]
        if (result < 10) {
            resultArray.push(result);
        }
        else {
            const resultstring = result.toString();
            const resultNumber = resultstring[1];
            resultArray.push(parseInt(resultNumber));
        }
    }

    for (let i = 0; i < 10; i++) {
        sumControl += resultArray[i];
    }

    const controlNumber = sumControl.toString()[1];
    
    PESEL.push((10 - controlNumber).toString());

    const PESELWithCommas = PESEL.join();
    const PESELNumber = PESELWithCommas.replace(/,/g, "");
    return PESELNumber  
}