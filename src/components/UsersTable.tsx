import {Badge, Button, Popconfirm, Table} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import {format} from 'date-fns'
import {user, DataType, nestedDataType, nestedType, userInstalmentInfosType} from '../Interfaces/Interfaces'

type User<T> = {
  users: T[]
}

export function UsersTable<T extends user>({users}: User<T>) {

  async function handleDelete(user: DataType): Promise<void> {
    try {
      await axios.delete(`http://localhost:3001/users/${user.key}` || `${import.meta.env.VITE_DB_URL}/users/${user.key}`)
    } catch (error) {
      console.log(error);
    } finally {
      document.location.reload();
    }
  }
  
  const columns: ColumnsType<DataType> = [
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Serviço', dataIndex: 'serviço', key: 'serviço' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor', render: (value) => (
      `R$ ${value}`
    ), },
    { title: 'Parcelas', dataIndex: 'parcelas', key: 'parcelas' },
    { title: 'Data', dataIndex: 'data', key: 'data' },
    {
      title: 'Ações',
      dataIndex: 'action',
      align: 'center',
      render: (_, user) => {    
        return (    
        <Popconfirm 
          title={'Tem certeza que deseja deletar?'}
          onConfirm={() => handleDelete(user)}
        >
          <Button danger type="primary">
            Deletar
          </Button>
        </Popconfirm>
        )
      },
    },
  ];

  const nestedColumns: ColumnsType<nestedDataType> = [
    { title: 'Parcela', dataIndex: 'parcela', key: 'parcela' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor', render: (value) => (
      `R$ ${value}`
    ), },
    { title: 'Data', dataIndex: 'data', key: 'data' },
    { title: 'Pago', dataIndex: 'pago', key: 'pago' },
    {
      title: 'Ações',
      dataIndex: 'action',
      align: 'center',
    },
  ];

  const data: DataType[] = [];
  const nestedData: nestedDataType[][] = [];

  users?.map((user, index) =>{
    const userBody = {
      key: user._id,
      cliente: user.userName,
      email: user.email,
      serviço: user.service,
      valor: user.value,
      parcelas: user.instalment,
      data: format(new Date(user.firsPaymentDay), "dd/MM/yyyy"),
    }

    const userListInfos: nestedDataType[] = []

    user.instalmentInfos.map((info: nestedType,index:number) => {
      const userInfos = {
        key: index,
        parcela: info.number,
        valor: info.value,
        data: format(new Date(info.paymentDay), "dd/MM/yyyy"),
        pago: info.payed ? 'Pago': 'Pendente',
      }
      userListInfos.push(userInfos)
    })

    nestedData.push(userListInfos)
    data.push(userBody)
  })

  return (
    <Table
      columns={columns}
      dataSource={data} 
      pagination={false}
      expandable={{
        rowExpandable: (user) => true,
        expandedRowRender: (user, index) => <Table bordered columns={nestedColumns} dataSource={nestedData[index]} pagination={false}/>
      }}
    />
  );
}
