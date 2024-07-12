import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataTable = ({ 
  columns, 
  data, 
  page, 
  sizePerPage, 
  totalSize, 
  defaultSorted,
  fetchData, 
  actionButtons = [],
  filterOptions
}) => {
  const actionsFormatter = (cell, row) => (
    <div className='text-center'>
      <div className='btn-group' role="group">
        {actionButtons.map((button, index) => {
          const buttonText = typeof button.text === 'function' ? button.text(row) : button.text;
          const buttonClass = typeof button.className === 'function' ? button.className(row) : button.className;
          const buttonIcon = typeof button.icon === 'function' ? button.icon(row) : button.icon;
          
          return button.formatter ? (
            button.formatter(cell, row)
          ) : (
            <button 
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                button.onClick(row);
              }}
              className={`btn btn-sm ${buttonClass} ${index > 0 ? 'ml-2' : ''}`}
            >
              {buttonIcon && <i className={`bi ${buttonIcon} mr-1`}></i>}
              {buttonText}
            </button>
          );
        })}
      </div>
    </div>
  );

  const tableColumns = [
    ...columns.map(col => ({
      ...col,
      filter: textFilter()
    })),
    ...(actionButtons.length > 0
      ? [
          {
            dataField: 'actions',
            text: 'Actions',
            formatter: actionsFormatter,
            headerStyle: () => ({ width: '8%' })
          }
        ]
      : [])
  ];

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, filters }) => {
    const currentFilter = filters ? Object.values(filters).reduce((acc, val) => acc + val.filterVal, '') : '';
    fetchData(page, sizePerPage, sortField, sortOrder, currentFilter);
  };

  return (
    <BootstrapTable 
      remote
      bootstrap4
      keyField="_id" 
      data={data} 
      columns={tableColumns}
      defaultSorted={defaultSorted}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={handleTableChange}
      filter={filterFactory(filterOptions)}
    />
  );
};

export default DataTable;
