import * as React from "react";
import "./styles.css";
import { server, Person, GET_USERS_PATH } from "./server";
import useSWR, { mutate } from "swr";

const LastPersonFirstName = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, server.get);
  if (error) return <div>failed to load</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div>last person's first name: {people[people.length - 1].firstName}</div>
  );
};

const LastPersonLastName = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, server.get);
  if (error) return <div>failed to load</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div>last person's last name: {people[people.length - 1].lastName}</div>
  );
};
const List = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, server.get);
  const onClick = async () => {
    const nextId = people!.length + 1;
    mutate(GET_USERS_PATH, async (users: Person[]) => {
      const user = await server.addById(nextId);
      return [user, ...users.slice(1)];
    });
  };

  if (error) return <div>failed to load</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div className="App">
      <h1>React SWR</h1>
      <LastPersonFirstName />
      <LastPersonLastName />

      {people.map(p => (
        <div>{p.firstName}</div>
      ))}
      <button onClick={onClick}>add</button>
    </div>
  );
};
export default function App() {
  return <List />;
}
