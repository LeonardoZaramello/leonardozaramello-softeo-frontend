import axios from "axios";
import { useEffect, useState } from "react";
import { ServiceForm } from "../components/ServiceForm";
import { UsersTable } from "../components/UsersTable";
import { CheckFuturePaymentsForms } from "../components/CheckFuturePaymentsForms";
import { Col, Typography  } from "antd";
import {ENVIRONMENT_URL} from "../api/config";

export function FrontPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { Text, Title } = Typography;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = await axios.get(`${ENVIRONMENT_URL}/users`);
        
        setUsers(users.data);
      } catch (error) {
        console.log(error);
        setErrorMessage('Erro ao buscar informações do usuário');
      }
    }

    getAllUsers();
  }, []);
  
  return (
    <div>
      <Title>Caderno de Anotações</Title>
      <Col span={22} offset={1}>
        <ServiceForm />
        <UsersTable users={users}/>
        <CheckFuturePaymentsForms users={users}/>
      </Col>
    </div>
  );
}
