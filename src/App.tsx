import * as React from "react";
import "./styles.css";
import { server, GET_USERS_PATH, Person } from "./server";
import useSWR, { mutate } from "swr";
import { ee } from "./ee";

const peopleFetcher = async () => JSON.parse(await server.get()) as Person[]

const LastPersonFirstName = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, peopleFetcher);
  if (error) return <div>failed to load. ${error?.message}</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div>last person's first name: {people[people.length - 1].firstName}</div>
  );
};

const Title = () => (<><h1>React and swr</h1>
  <hr/></>)

const Log = () => {
  const [msg, setMsg] = React.useState('data revalidation was not called');
  ee.on('revalidate',setMsg)
  return (<div>{msg}</div>)
}

const LastPersonLastName = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, peopleFetcher);
  if (error) return <div>failed to load. ${error?.message}</div>;
  if (!people) return <div>loading...</div>;
  return (
    <div>last person's last name: {people[people.length - 1].lastName}</div>
  );
};

const List = () => {
  const { data: people, error } = useSWR(GET_USERS_PATH, peopleFetcher);
  const onClick = async () => {
    
    mutate(GET_USERS_PATH, async (users: Person[]) => {
      const nextId = users.length + 1;
      const user = await server.addById(nextId);
      return [...users, user];
    });
  };


  if (error) return <div>failed to load</div>;	
  if (!people) return <div>loading...</div>;
  //console.log('people',JSON.stringify(people,null,2))
  return (
    <>

      <LastPersonFirstName />
      <LastPersonLastName />
      
      {people!.map((p,index) => (
        <div key={index}>{p.firstName}</div>
      ))}
      <button onClick={onClick}>add</button>
    </>
  );
};
export default function App() {
  return <div className="App"><Title/><Log/><List /></div>;
}
