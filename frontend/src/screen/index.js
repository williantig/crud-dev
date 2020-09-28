import React, {
  useCallback,
  useState,
  Fragment,
  useMemo,
  useRef,
} from 'react';

import {
  Layout, Table, PageHeader,
  Button, Spin,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

import { SEX } from '../values/enums';
import EditButton from './EditButton';
import SearchForm from './SearchForm';
import styles from './index.module.scss';
import DeleteButton from './DeleteButton';
import DeveloperModal from './DeveloperModal';
import useDidMount from '../hooks/useDidMount';
import useDidMountAndUpdate from '../hooks/useDidMountAndUpdate';

const { Header, Content } = Layout;
const { Column } = Table;

const GET_KEY = item => item.id;
const RENDER_DATE = date => moment(date).format('DD/MM/YYYY');
const RENDER_SEX = sex => SEX.find(item => item.key === sex)?.label;
const TABLE_SCROLL = {
  x: 800,
};

function App() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);

  const $modalRef = useRef(null);

  const requestDevelopers = useCallback(async (page = 1, pageSize = 20) => {
    try {
      setLoading(true)
      const { data } = await axios.get('/developers', {
        params: {
          page,
          size: pageSize,
          ...filters,
        }
      });
      setResults(data.result);
      setPagination(data.pagination);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleSearch = useCallback(async filters => {
    setFilters(filters);
  }, []);

  const handleRemoveDeveloper = useCallback(async developer => {
    try {
      setLoading(true);
      await axios.delete(`/developers/${developer.id}`);
      await requestDevelopers();
    } catch (ex) {

    } finally {
      setLoading(false);
    }
  }, [requestDevelopers]);

  const tablePagination = useMemo(() => (
    pagination ? {
      current: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.rowCount,
      onChange: requestDevelopers,
    } : {}
  ), [pagination, requestDevelopers]);

  const handleEditDeveloper = useCallback(developer => {
    $modalRef.current.show(developer);
  }, []);

  const handleAddNewDeveloper = useCallback(() => {
    $modalRef.current.show({});
  }, []);

  const extraHeader = useMemo(() => ([
    <Button key="1" type="primary" icon={<PlusOutlined />} onClick={handleAddNewDeveloper}>
      Adicionar
    </Button>,
  ]), [handleAddNewDeveloper]);

  const renderActions = useCallback(record => {
    return (
      <Fragment>
        <EditButton
          onDelete={handleEditDeveloper}
          developer={record}
        />
        <DeleteButton
          onDelete={handleRemoveDeveloper}
          developer={record}
        />
      </Fragment>
    )
  }, [handleRemoveDeveloper, handleEditDeveloper]);

  useDidMount(() => {
    requestDevelopers();
  });

  useDidMountAndUpdate(() => {
    requestDevelopers();
  }, [filters]);

  return (
    <Layout className={styles.layout}>
      <Header>
        <div className={styles.headerContent}>
          <h1>CRUD Dev</h1>
        </div>
      </Header>
      <Content className={styles.contentContainer}>
        <Spin spinning={loading}>
          <PageHeader
            ghost={false}
            title="Desenvolvedores"
            subTitle="Listagem de desenvolvedores"
            extra={extraHeader}
          >
            <SearchForm onSearch={handleSearch} />
          </PageHeader>
          <Table
            dataSource={results}
            rowKey={GET_KEY}
            pagination={tablePagination}
            scroll={TABLE_SCROLL}
          >
            <Column
              dataIndex="id"
              title="#"
            />
            <Column
              dataIndex="name"
              title="Nome"
            />
            <Column
              dataIndex="sex"
              title="Sexo"
              key="sex"
              render={RENDER_SEX}
            />
            <Column
              dataIndex="birthday"
              render={RENDER_DATE}
              title="Data de nascimento"
            />
            <Column
              dataIndex="age"
              title="Idade"
              key="age"
            />
            <Column
              dataIndex="hobby"
              title="Hobby"
              key="hobby"
            />
            <Column
              title="Ações"
              key="actions"
              render={renderActions}
            />
          </Table>
        </Spin>
      </Content>
      <DeveloperModal ref={$modalRef} refreshList={requestDevelopers} />
    </Layout >
  );
}

export default App;
