import { isAfter, isBefore } from 'date-fns'
import { Button, DatePicker, Form, Row } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {user} from '../Interfaces/Interfaces'

type User<T> = {
  users: T[]
}

export function CheckFuturePaymentsForms<T extends user>({users}: User<T>) {
  const [value, setValue] = useState(0)
  const [searched, setSearched] = useState(false)
  
  //Func calc valor to receive
  const submitForm = async (values: { dia1: { _d: string | number | Date }; dia2: { _d: string | number | Date } }) => {
    const dia1 = new Date(values.dia1._d);
    const dia2 = new Date(values.dia2._d);
    const paymentsList: any = []

    // Get all payments
    users.map((user: { instalmentInfos: []; }) => paymentsList.push(...user.instalmentInfos))
    let price = 0
    // Filter all payments
    paymentsList.map((payment: {value: number; paymentDay: number; }) => {
      if(isAfter(new Date(payment.paymentDay), dia1) && isBefore(new Date(payment.paymentDay), dia2)){
        price += payment.value
      }
    })

    setValue(price)
    setSearched(true)   
  };

  return (
    <Form
      onFinish={(values) => submitForm(values)}
    >
      Consultar ganhos
      <Row>
        <Form.Item
          label="1º Data"
          name="dia1"
          rules={[
            {
              required: true,
              message: 'Informe a primeira data'
            },
          ]}
          hasFeedback
        >
          <DatePicker/>
        </Form.Item>
        <Form.Item
          label="1º Data"
          name="dia2"
          rules={[
            {
              required: true,
              message: 'Informe a segunda data'
            },
          ]}
          hasFeedback
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Pesquisar"
        >
          <Button htmlType="submit" type="primary" icon={<SearchOutlined />} ></Button>
        </Form.Item>
      </Row>
        {
          searched == true && value > 0  ? <h2>{`Valor total a receber: R$ ${value}`}</h2> :
          searched == true && value === 0  ? <h2>{`Nada a receber entre os períodos informados`}</h2> :
          null
        }
    </Form>
  );
}

