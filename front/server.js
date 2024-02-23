const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./src'));

app.listen(3333, () => console.log('Projeto rodando na porta 3333...'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'index.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'categories.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'register.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'pages', 'profile.html'));
});