import faker from "@faker-js/faker";

export default function userDataFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
