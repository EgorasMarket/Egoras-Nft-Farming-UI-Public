import { faker } from "@faker-js/faker";
const values = [];
for (let i = 0; i < 100; i++) {
  values.push({
    timestamp: faker.date.recent(30).getTime(),
    value: faker.finance.amount(),
  });
}

export default values;
