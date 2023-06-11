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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

db().then(() => {
  const cities = require('./cities');
  const { places, descriptors } = require('./seedsHelper');
  const Campground = require('../models/campground');
  const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 77; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
      });
      await camp.save();
    }
  };
  seedDB().then(() => {
    mongoose.connection.close();
  });
});