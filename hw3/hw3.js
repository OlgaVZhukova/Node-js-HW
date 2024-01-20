const express = require("express");

const app = express();
const fs = require("fs");

const directoryOfFile = "counter.json";

let counter = {};

function saveCounter(counterObject) {
    fs.writeFileSync(directoryOfFile, JSON.stringify(counterObject));
}

// Проверка наличия файла со счетчиками
try {
    const data = fs.readFileSync(directoryOfFile);
    counter = JSON.parse(data);
} catch (err) {
    if (err.code === "ENOENT") {
        saveCounter(counter);
    } else {
        throw err;
    }
}

// Считаем просмотры в промежуточном обработчике
app.use((req, res, next) => {
    if (!counter[req.url]) {
        counter[req.url] = 0;
    }
    counter[req.url] += 1;
    req.counter = counter[req.url];
    saveCounter(counter);
    next();
});

app.get("/", (req, res) => {
    res.send(`
        <h1>Корневая страница</h1>
        <p>Просмотров: ${req.counter}</p>
        <a href='/about'>Ссылка на страницу /about</a>
    `);
});

app.get("/about", (req, res) => {
    res.send(`
        <h1>Страница about</h1>
        <p>Просмотров: ${req.counter}</p>
        <a href='/'>Ссылка на страницу / </a>
    `);
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});