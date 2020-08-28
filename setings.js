const array = {
    date: {
        gender: ['m' ,'k'],
        maleNames: ['Bartosz', 'Adam', 'Krzysztof', 'Tomasz', 'Dawid'],
        femaleNames: ['Katarzyna', 'Joanna', 'Barbara', 'Anna', 'Weronika', 'Marta'],
        lastNames: ['Nowak', 'Siejak', 'Waniorek', 'Dudek', 'Gromada', 'Socha', 'Kowal'],
        domen: ['gmail.com', 'onet.pl', 'wp.pl', 'o2.pl'],
        people: [],
        mail: [],
    },
    PESEL: {
        key: [1,3,7,9,1,3,7,9,1,3],
        femaleNumber: [0, 2, 4, 6, 8],
        maleNumber: [1, 3, 5, 7, 9],
    }
};

const other = {
    global: {
        numberRecord: 100, // ilość rekordów do wygenerowania
    },
    age: {
        minAge: 10, // minimalny wiek
    },
    phone: {
        PhoneNumberSeparator: '-', // Separtaor numeru telefonów
    }
};


exports.array = array;
exports.other = other;