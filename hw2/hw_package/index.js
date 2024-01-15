function generateRandomDate() {
    // Генерация случайного числа для дня, месяца и года
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year =
        Math.floor(Math.random() * (new Date().getFullYear() - 1900 + 1)) + 1900;

    // Форматирование даты в строку DD-MM-YYYY
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
}

// Пример использования функции
const randomDate = generateRandomDate();

console.log(randomDate);

module.exports = { generateRandomDate };