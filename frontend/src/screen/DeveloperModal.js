import React, { forwardRef, useState, useCallback } from 'react';

import {
  Modal, Form, Input,
  DatePicker, InputNumber, Select,
} from 'antd';
import moment from 'moment';
import axios from 'axios';

import styles from './DeveloperModal.module.scss';

const REQUIRED_RULES = [{
  required: true,
}];

const FIELDS = [
  {
    name: 'name',
    label: 'Nome',
    colProps: {
      md: 6,
    },
    rules: REQUIRED_RULES,
    component: <Input />
  },
  {
    name: 'birthday',
    label: 'Data de nascimento',
    colProps: {
      md: 5,
    },
    rules: REQUIRED_RULES,
    component: <DatePicker format="DD/MM/YYYY" className={styles.fixInputWidth} />
  },
  {
    name: 'age',
    label: 'Idade',
    colProps: {
      md: 4,
    },
    rules: REQUIRED_RULES,
    component: <InputNumber className={styles.fixInputWidth} />
  },
  {
    name: 'sex',
    label: 'Sexo',
    colProps: {
      md: 4,
    },
    rules: REQUIRED_RULES,
    component: (
      <Select>
        <Select.Option value="M">Masculino</Select.Option>
        <Select.Option value="F">Feminino</Select.Option>
        <Select.Option value="X">Outro</Select.Option>
      </Select>
    )
  },
  {
    name: 'hobby',
    label: 'Hobby',
    colProps: {
      md: 5,
    },
    component: <Input />
  },
];

const DeveloperModal = forwardRef((props, $ref) => {
  const [form] = Form.useForm();

  const { refreshList } = props;

  const [visible, setVisible] = useState(false);
  const [currentDeveloper, setCurrentDeveloper] = useState(null);

  const handleShow = useCallback(developer => {
    setCurrentDeveloper(developer);
    const { birthday } = developer;
    form.setFieldsValue({
      ...developer,
      birthday: birthday ? moment(developer.birthday) : null,
    });
    setVisible(true);
  }, [form]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const clearForm = useCallback(() => {
    form.resetFields();
    setCurrentDeveloper(null);
  }, [form]);

  const handleSave = useCallback(async () => {
    form.validateFields()
      .then(async values => {
        if (currentDeveloper?.id) {
          const { id } = currentDeveloper;
          await axios.put(`/developers/${id}`, values);
        } else {
          await axios.post('/developers', values)
        }
        console.log(values);
        await refreshList();
        handleDismiss();
      });
  }, [form, currentDeveloper, refreshList, handleDismiss]);

  if ($ref) {
    $ref.current = {
      show: handleShow,
      dismiss: handleDismiss,
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleDismiss}
      width="60%"
      okText="Salvar"
      cancelText="Cancelar"
      onOk={handleSave}
      afterClose={clearForm}
    >
      <Form form={form} name="createUpdate" layout="vertical">
        {FIELDS.map(field => (
          <Form.Item key={field.name} name={field.name} label={field.label} rules={field.rules}>
            {field.component}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
});

export default DeveloperModal;
