const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedhelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
// yelp-camp user: 6926b3d87ceb807f441db847 (for seed author)
// yelp-camp-maptiler user: 6926f80671fd28135dd9cd6b (for testing)
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6926b3d87ceb807f441db847",

      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dycytpsj9/image/upload/v1764159193/YelpCamp/mtisd1iewdbl2cfixaa0.jpg",
          filename: "YelpCamp/mtisd1iewdbl2cfixaa0",
        },
        {
          url: "https://res.cloudinary.com/dycytpsj9/image/upload/v1764159195/YelpCamp/ikj0pqwoepo4cg29olkm.jpg",
          filename: "YelpCamp/ikj0pqwoepo4cg29olkm",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
