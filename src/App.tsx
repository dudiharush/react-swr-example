import * as React from "react";
import "./styles.css";
import { server, GET_USERS_PATH } from "./server";
import { useQuery, useMutation, queryCache } from "react-query";

const LastPersonFirstName = () => {
  const { status, data: people, error } = useQuery(GET_USERS_PATH, server.get);
  if (status === "error") return <div>failed to load. ${error?.message}</div>;
  if (status === "loading") return <div>loading...</div>;
  return (
    <div>last person's first name: {people![people!.length - 1].firstName}</div>
  );
};

const LastPersonLastName = () => {
  const { status, data: people, error } = useQuery(GET_USERS_PATH, server.get);
  if (status === 'error') return <div>failed to load. ${error?.message}</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div>last person's last name: {people[people.length - 1].lastName}</div>
  );
};

const addUserFetcher = ({ id }:{id: number}) => server.addById(id);

const List = () => {
  const { status, data: people, error } = useQuery(GET_USERS_PATH, server.get);
  const [addUser] = useMutation(addUserFetcher, {onSuccess: ()=> queryCache.refetchQueries(GET_USERS_PATH)})

  const onClick = async () => {
    const nextId = people!.length + 1;
    addUser({id:nextId})
  };


  if (status === 'error') return <div>failed to load. ${error?.message}</div>;
  if (status === 'loading') return <div>loading...</div>;
  return (
    <div className="App">
      <h1>React and react-query</h1>
      <LastPersonFirstName />
      <LastPersonLastName />

      {people!.map((p,index) => (
        <div key={index}>{p.firstName}</div>
      ))}
      <button onClick={onClick}>add</button>
    </div>
  );
};
export default function App() {
  return <List />;
}
