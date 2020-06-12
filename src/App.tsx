import * as React from "react";
import "./styles.css";
import { server, GET_USERS_PATH } from "./server";
import { useQuery, useMutation, queryCache } from "react-query";
import { ee } from "./ee";

const LastPersonFirstName = () => {
  const { status, data: people, error } = useQuery(GET_USERS_PATH, server.get);
  if (status === "error") return <div>failed to load. ${error?.message}</div>;
  if (status === "loading") return <div>loading...</div>;
  return (
    <div>last person's first name: {people![people!.length - 1].firstName}</div>
  );
};

const Title = () => (<><h1>React and react-query</h1>
  <hr/></>)

const Log = () => {
  const [msg, setMsg] = React.useState('data revalidation was not called');
  ee.on('revalidate',setMsg)
  return (<div>{msg}</div>)
}

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
