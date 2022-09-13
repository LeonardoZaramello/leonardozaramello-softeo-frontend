import { isAfter, isBefore } from 'date-fns'
import { Button, DatePicker, Form, Row } from 'antd';
import { useState } from 'react';

type SizeType = Parameters<typeof Form>[0]['size'];

export function UtilForm(props: any) {
  const [value, setValue] = useState(0)
  
  const submitForm = async (values: any) => {
    const dia1 = new Date(values.dia1._d);
    const dia2 = new Date(values.dia2._d);
    const paymentsList: any = []

    // Get all payments
    props.users.map((user: { instalmentInfos: []; }) => paymentsList.push(...user.instalmentInfos))
    let price = 0
    // Filter all payments
    paymentsList.map((payment: {value: number; paymentDay: number; }) => {
      if(isAfter(new Date(payment.paymentDay), dia1) && isBefore(new Date(payment.paymentDay), dia2)){
        price += payment.value
      }
    })

    setValue(price)
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
          label="Enviar"
        >
          <Button htmlType="submit" >Enviar</Button>
        </Form.Item>
      </Row>
        {
          value > 0 &&
          <h2>{`Valor total à receber: ${value}`}</h2>
        }
    </Form>
  );
}

