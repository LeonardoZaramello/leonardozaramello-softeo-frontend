import axios from "axios";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Popconfirm
} from 'antd';
import React, { useState } from 'react';

type SizeType = Parameters<typeof Form>[0]['size'];

export function ServiceForm(props: any) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = (form: FormData) => {
    console.log(form);
    
  };


  async function handleDelete(): Promise<void> {
    try {
      await axios.post(`${import.meta.env.VITE_DB_URL}/${props.user.key}`)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
        label="Cliente"
        rules={[
          {
            required: true,
            message: 'Insira um nome'
          },
          {
            whitespace: true,
            min: 3,
            message: 'Nome maior que 3'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Serviço">
        <Select>
          <Select.Option value="Limpeza">Limpeza</Select.Option>
          <Select.Option value="Obturação">Obturação</Select.Option>
          <Select.Option value="Sutura">Sutura</Select.Option>
          <Select.Option value="CRemoção dos cisos">Remoção dos cisos</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Dia da 1º Parcela">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Parcelas">
        <InputNumber />
      </Form.Item>
      <Form.Item label="1º parcela paga?" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Enviar">
        <Button >Salvar</Button>
      </Form.Item>
    </Form>
  );
}

