import {Button, Popconfirm, Table} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import {format} from 'date-fns'
import {user, userListInfos, DataType, nestedDataType, nestedType} from '../Interfaces/Interfaces'

type User<T> = {
  users: T[]
}

export function UsersTable<T extends user>({users}: User<T>) {

  async function handleDelete(user: DataType): Promise<void> {
    try {
      await axios.delete(`${import.meta.env.VITE_DB_URL}/${user.key}`)
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
    { title: 'Valor', dataIndex: 'valor', key: 'valor' },
    { title: 'Parcelas', dataIndex: 'parcelas', key: 'parcelas' },
    { title: 'Data', dataIndex: 'data', key: 'data' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, user) => {    
        return (    
        <Popconfirm 
          title={'Tem certeza que deseja deletar?'}
          onConfirm={() => handleDelete(user)}
        >
          <Button danger type="primary">
            Delete
          </Button>
        </Popconfirm>
        )
      },
    },
  ];

  const nestedColumns: ColumnsType<nestedDataType> = [
    { title: 'Parcela', dataIndex: 'parcela', key: 'parcela' },
    { title: 'Valor', dataIndex: 'valor', key: 'valor' },
    { title: 'Dia', dataIndex: 'dia', key: 'dia' },
    { title: 'Pago', dataIndex: 'pago', key: 'pago' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
    },
  ];

  const data: DataType[] = [];
  const nestedData: any = [];

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

    const userListInfos: userListInfos[] = []

    user.instalmentInfos.map((info: nestedType,index:number) => {
      const userInfos = {
        key: index,
        parcela: info.number,
        valor: info.value,
        dia: format(new Date(info.paymentDay), "dd/MM/yyyy"),
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
