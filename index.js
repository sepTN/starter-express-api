const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const db = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_CONN_STRING);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

const Campground = require('./models/campground');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecamp', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!' });
    await camp.save();
    res.send(camp);
});

db().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started!");
    })
});