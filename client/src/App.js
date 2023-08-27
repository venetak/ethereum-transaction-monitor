import React, { useEffect, useState } from 'react';
import { Table, Tag, Form, Layout } from 'antd';

const POLLING_INTERVAL = 5000;

const columns = [
  {
    title: 'hash',
    dataIndex: 'hash',
  },
  {
    title: 'to',
    dataIndex: 'to',
  },
  {
    title: 'from',
    dataIndex: 'from',
  },
  {
    title: 'nonce',
    dataIndex: 'nonce',
  },
  {
    title: 'Gas Limit',
    dataIndex: 'gasLimit',
  },
  {
    title: 'Gas Price',
    dataIndex: 'gasPrice',
  },
  {
    title: 'Max Fee Per Gas',
    dataIndex: 'maxFeePerGas',
  },
  {
    title: 'Chain Id',
    dataIndex: 'chainId',
  },
  {
    title: 'Config Id',
    dataIndex: 'configId',
  },
];

const LayoutStyle = {
  padding: 40
};

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  
  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:9444/transactions`)
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.length,
          },
        });
      });
  };

  useEffect(() => {
    fetchData()

    if (window.polling) clearInterval(window.polling);
    window.polling = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL)
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Layout style={LayoutStyle}>
      <h1>Transactions</h1>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Layout>

  );
};
export default App;