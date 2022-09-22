import axios from "axios";
import { useEffect, useState } from "react";
import { ServiceForm } from "../components/ServiceForm";
import { UsersTable } from "../components/UsersTable";
import { CheckFuturePaymentsForms } from "../components/CheckFuturePaymentsForms";
import { Col, Row } from "antd";

export function FrontPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
  
  return (
    <div>
      <h1 className="text-xl mb-2">Caderno de Anotações</h1>
      <Col span={22} offset={1}>
        <ServiceForm />
        <UsersTable users={users}/>
        <CheckFuturePaymentsForms users={users}/>
      </Col>
    </div>
  );
}
