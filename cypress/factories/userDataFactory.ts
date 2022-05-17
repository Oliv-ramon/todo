import faker from "@faker-js/faker";

export default function userDataFactory() {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
