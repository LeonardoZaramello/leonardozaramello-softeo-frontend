import axios from "axios";
import { useEffect, useState } from "react";
import { UsersTable } from "../components/UsersTable";

export function FrontPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(import.meta.env.VITE_DB_URL);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const users = await axios.get(import.meta.env.VITE_DB_URL || 'http://localhost:3001/users');
        
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
    <div className="p-5 h-screen bg-gray-100">
      <h1 className="text-xl mb-2">Caderno de Anotações</h1>
      <UsersTable users={users}/>
    </div>
  );
}
