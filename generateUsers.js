// generateUsers.js
import { Country, City } from "country-state-city";
import { faker } from "@faker-js/faker";
import fs from "fs";

const NUM_USERS_PER_COUNTRY = 10;
const users = [];

const allCountries = Country.getAllCountries();

allCountries.forEach((c) => {
  const countryCode = c.isoCode;
  const countryName = c.name;

  const cities = City.getCitiesOfCountry(countryCode);

  for (let i = 0; i < NUM_USERS_PER_COUNTRY; i++) {
    const city =
      cities.length > 0
        ? cities[Math.floor(Math.random() * cities.length)].name
        : null;

    const newUser = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      countryCode,
      country: countryName,
      city,
      img: faker.image.avatar(),
      online: faker.datatype.boolean(),

      // ✅ ساخت متن اتومات
      text: faker.lorem.paragraph(),
    };

    users.push(newUser);
  }
});

fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");

console.log(`✅ ${users.length} users created successfully with text!`);

