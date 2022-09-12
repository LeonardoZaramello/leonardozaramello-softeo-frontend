import axios from "axios";
import { useEffect, useState } from "react";
import { UsersTable } from "../components/UsersTable";

export function FrontPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const users = await axios.get('http://localhost:3001/users');
        
        setUsers(users.data);
      } catch (error) {
        console.log(error);
        setErrorMessage('Erro ao buscar informações do usuário');
      }
    }

    fetchApi();
  }, []);
  
  // console.log(users);
  return (
    <div>
      <h1 className="text-green-600 bg-black">Anotações</h1>
      <UsersTable users={users}/>
    </div>
  );
}
