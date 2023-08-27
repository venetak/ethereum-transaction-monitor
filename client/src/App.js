import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';

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
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          });
        });
    };
  
    useEffect(() => {
      if (window.polling) clearInterval(window.polling);
      window.polling = setInterval(fetchData, POLLING_INTERVAL)
      // fetchData();
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
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    );
  };
  export default App;