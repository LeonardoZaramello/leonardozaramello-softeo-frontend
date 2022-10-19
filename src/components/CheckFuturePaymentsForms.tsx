import { isAfter, isBefore } from 'date-fns'
import { Button, DatePicker, Form, Row } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {nestedType, user, userInstalmentInfosType} from '../Interfaces/Interfaces'

type User<T> = {
  users: T[]
}

export function CheckFuturePaymentsForms<T extends user>({users}: User<T>) {
  const [value, setValue] = useState(0)
  const [searched, setSearched] = useState(false)
  
  //Func calc valor to receive
  const submitForm = async (values: { dia1: { _d: string }; dia2: { _d: string } }) => {
    const dia1 = new Date(values.dia1._d);
    const dia2 = new Date(values.dia2._d);
    const paymentsList: nestedType[] = []
    let price = 0

    // Get all payments
    users.map(({ instalmentInfos }) => paymentsList.push(...instalmentInfos))
    // Filter all payments
    paymentsList.map(({paymentDay, value}) => {
      if(isAfter(new Date(paymentDay), dia1) && isBefore(new Date(paymentDay), dia2)){
        price += value
      }
    })

    setValue(Math.round(price * 100)/100)
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
          label="2º Data"
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

