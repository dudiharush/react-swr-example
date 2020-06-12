import { ee } from "./ee";

const createUserById = (id: number) => ({
  id,
  firstName: `first${id}`,
  lastName: `last${id}`
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const people: Person[] = [1, 2, 3].map(createUserById);
export const GET_USERS_PATH = "/api/users";

let dataRevalidationCount = 1;

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
};
export const server = {
  addById: async (personId: number) => {
    const newUser = createUserById(personId);
    people.push(newUser);
    return newUser;
  },
  remove: async (personId: number) => {
    const foundIndex = people.findIndex(p => p.id === personId);
    if (foundIndex > -1) people.splice(foundIndex, 1);
  },
  get: async () => {
    await delay(700);

    ee.emit(
      "revalidate",
      `revalidation was called: ${dataRevalidationCount} times`
    );

    dataRevalidationCount++;
    return people;
  }
};
