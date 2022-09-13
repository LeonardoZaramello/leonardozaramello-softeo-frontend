import {Button, Popconfirm, Table} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import {format} from 'date-fns'

interface user {
  _id: string
  userName: string
  email: string
  service: string
  value: number
  instalment: number
  firsPaymentDay: Date
  payed: boolean
  createdAt: Date
  updatedAt: Date
  instalmentInfos: []
}

type User<T> = {
  users: T[]
}

export function UsersTable<T extends user>(props: User<T>) {

  // async function handleDeleteInstalment(record:any): Promise<void> {
  //   try {
  //     console.log(record);
      
  //     // await axios.delete(`${import.meta.env.VITE_DB_URL}/${user.key}`)
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     document.location.reload();
  //   }
  // }

  async function handleDelete(user: DataType): Promise<void> {
    try {
      await axios.delete(`${import.meta.env.VITE_DB_URL}/${user.key}`)
    } catch (error) {
      console.log(error);
    } finally {
      document.location.reload();
    }
  }
  
  interface DataType {
    key: React.Key
    cliente: string
    email: string
    serviço: string
    valor: number
    parcelas: number
    data: string
  }
  interface nestedDataType {
    key: React.Key
    parcela: string
    valor: string
    dia: number
    pago: string
  }

  type nestedType = {
    number: number
    value: string
    paymentDay: string
    payed: boolean
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
      // render: (_, record) => {    
      //   return (    
      //   <Popconfirm 
      //     title={'Tem certeza que deseja deletar?'}
      //     onConfirm={() => handleDeleteInstalment(record)}
      //   >
      //     <Button danger type="primary" size="small">
      //       Delete
      //     </Button>
      //   </Popconfirm>
      //   )
      // },
    },
  ];

  const data: DataType[] = [];
  const nestedData: any[] = [];

  props.users?.map((user, index) =>{
    const userBody = {
      key: user._id,
      cliente: user.userName,
      email: user.email,
      serviço: user.service,
      valor: user.value,
      parcelas: user.instalment,
      data: format(new Date(user.firsPaymentDay), "dd/MM/yyyy"),
    }

    const userListInfos: any = []
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
