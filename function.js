const set = require( './setings' );

exports.randChoice = function randChoice(arr) {
    const arrLength = arr.length
    const randomNumber = Math.floor(Math.random() * arrLength)
    const randomElem = arr[randomNumber]
    return randomElem
}

/*function randChoice(arr) {
    const arrLength = arr.length
    const randomNumber = Math.floor(Math.random() * arrLength)
    const randomElem = arr[randomNumber]
    return randomElem
}*/

exports.randName = function randName(arr) {
    if (arr == 'k') {
        const choiceName = randChoice(set.femaleNames);
        return choiceName;
    }
    if (arr == 'm') {
        const choiceName = randChoice(set.maleNames);
        return choiceName;
    }
    else {
        return 'błąd płci'
    }
}

exports.randAge = function randAge() {
    const randAge = Math.floor(Math.random() * 50 + set.minAge);
    return randAge
}

exports.mailCreation = function mailCreation(choiceName, choiceLastName, domen, mail) {
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

exports.randNumber = function randNumber () {
    const phoneNumberArray = [];
    const PhoneNumberSeparator = '-';
    for (let i=0; i < 9; i++) {
        const randNumber = Math.floor(Math.random() * 9);
        phoneNumberArray.push (randNumber);
    }
    const phoneNumberWithCommas = phoneNumberArray.join();
    const phoneNumber = phoneNumberWithCommas .replace(/,/g, "");
    const finallyPhoneNumber = phoneNumber.slice(0,3) + PhoneNumberSeparator  + phoneNumber.slice(3,6) + PhoneNumberSeparator + phoneNumber.slice(6,9)
    return finallyPhoneNumber
}

exports.randPESEL = function randPESEL (choiseGender, choiceAge) {

    const PESEL = [];
    const keyPESEL= [1,3,7,9,1,3,7,9,1,3]
    const resultArray = [];
    const femaleNumber = [0, 2, 4, 6, 8];
    const maleNumber = [1, 3, 5, 7, 9];

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
        sex = randChoice(femaleNumber);
    }
    else {
        sex = randChoice(maleNumber);
    }
    PESEL.push(sex.toString());

    //number 11 (control)
    for ( let i = 0; i < 10; i++) {
        const result = PESEL[i] * keyPESEL[i]
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