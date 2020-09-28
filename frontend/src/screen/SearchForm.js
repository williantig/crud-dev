import React, { memo, useCallback } from 'react';

import {

  Button, Input, Form,
  Row, Col, DatePicker,
  InputNumber, Select,
} from 'antd';

import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

import styles from './SearchForm.module.scss';

const FIELDS = [
  {
    name: 'name',
    label: 'Nome',
    colProps: {
      md: 6,
    },
    component: <Input />
  },
  {
    name: 'hobby',
    label: 'Hobby',
    colProps: {
      md: 5,
    },
    component: <Input />
  },
  {
    name: 'birthday',
    label: 'Data de nascimento',
    colProps: {
      md: 5,
    },
    component: <DatePicker format="DD/MM/YYYY" className={styles.fixInputWidth} />
  },
  {
    name: 'age',
    label: 'Idade',
    colProps: {
      md: 4,
    },
    component: <InputNumber className={styles.fixInputWidth} />
  },
  {
    name: 'sex',
    label: 'Sexo',
    colProps: {
      md: 4,
    },
    component: (
      <Select>
        <Select.Option value="M">Masculino</Select.Option>
        <Select.Option value="F">Feminino</Select.Option>
        <Select.Option value="X">Outro</Select.Option>
      </Select>
    )
  },
];

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const clearForm = useCallback(() => {
    form.resetFields();
    onSearch();
  }, [onSearch, form]);

  return (
    <Form form={form} name="search" onFinish={onSearch} layout="vertical">
      <Row gutter={24}>
        {FIELDS.map(field => (
          <Col key={field.name} {...field.colProps}>
            <Form.Item name={field.name} label={field.label}>
              {field.component}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row gutter={24} justify="end">
        <Col>
          <Form.Item>
            <Button icon={<ClearOutlined />} onClick={clearForm}>
              Limpar filtros
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default memo(SearchForm);
