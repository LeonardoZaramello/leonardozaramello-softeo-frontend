import axios from "axios";
import { Button, DatePicker, Form, Input, InputNumber, Select, Switch, Row, Col, Space} from 'antd';
import { FileAddOutlined } from "@ant-design/icons";

export function ServiceForm(props: any) {
  const submitForm = async (values: any) => {
    try {
      const bodyToPost = {
        userName: values.cliente,
        email: values.email,
        service: values.servico,
        value: values.valor,
        instalment: values.parcelas,
        firsPaymentDay: values.dia,
        payed: values.checked == true ? true : false
      }

      await axios.post(`${import.meta.env.VITE_DB_URL}/users` || 'http://localhost:3001/users', bodyToPost);
    } catch (error) {
      console.log(error);
    } finally{
      document.location.reload();
    }
  };

  return (
    <Form
      size={"large"}
      onFinish={(values) => submitForm(values) }
    >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Cliente"
              name="cliente"
              rules={[
                {
                  required: true,
                  message: 'Insira um nome'
                },
                {
                  min: 3,
                  message: 'Cliente com no mínimo 3 letras'
                }
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Insira um email'
                },
                {
                  type: "email",
                  message: 'Insira um email com formato válido'
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Serviço"
            name="servico"
            rules={[
              {
                required: true,
                message: 'Insira um serviço'
              },
            ]}
            hasFeedback
          >
            <Select>
              <Select.Option value="Limpeza">Limpeza</Select.Option>
              <Select.Option value="Obturação">Obturação</Select.Option>
              <Select.Option value="Sutura">Sutura</Select.Option>
              <Select.Option value="Remoção dos cisos">Remoção dos cisos</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Valor">
            <Form.Item
              noStyle
              name="valor"
              rules={[
                {
                  required: true,
                  message: 'Informe um valor'
                },
              ]}
              hasFeedback
              >

              <InputNumber
                style={{ width: 120 }}
                defaultValue={1000}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Parcelas">
            <Form.Item
              noStyle
              name="parcelas"
              rules={[
                {
                  required: true,
                  message: 'Informe o número de parcelas'
                },
              ]}
              hasFeedback
            >
              <InputNumber min={1} max={24}/>
            </Form.Item>
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={8}>
        <Col>
          <Form.Item
            label="1º Parcela"
            name="dia"
            rules={[
              {
                required: true,
                message: 'Informe o dia do 1º pagamento'
              },
            ]}
            hasFeedback
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="1º parcela paga?"
            valuePropName="checked"
            name="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Space align="center">
        <Form.Item
          label="Enviar"
        >
          <Button htmlType="submit" type="primary" icon={<FileAddOutlined/>}></Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

