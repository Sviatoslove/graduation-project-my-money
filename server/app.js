const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path')
const cors = require('cors')
const chalk = require('chalk');
const initDatabase = require('./startUp/initDataBase');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

if (process.env.NODE_ENV === 'production') {
  console.log(chalk.blueBright('Production'));
  app.use('/', express.static(path.join(__dirname, 'client')))
  const indexPath = path.join(__dirname, 'client', 'index.html')
 app.get('*',(req,res)=>{
   res.sendFile(indexPath)// отдаём 'index.html' клиенту с помощью метода sendFile
 })
} else {
  console.log(chalk.blueBright('Development'));
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(config.get('mongoUrl'));
    app.listen(PORT, () => {
      console.log(
        chalk.bgGreenBright(`Server has been started on port: ${PORT}...`)
      );
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
