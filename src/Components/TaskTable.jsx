import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import './index.css';
import StatusCell from './StatusCell';
import Filters from './Filters';
import DeleteIcon from './DeleteIcon';
import User from './User';
import { DATA } from '../data';




const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [ShowIssue, setShowIssue] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 6, //default page size
  });

  // Function to remove selected rows
  const removeSelectedRows = () => {
    const remainingData = data.filter(
      (_, index) => !selectedRows[index]
    );
    setData(remainingData);
    setSelectedRows({});
  };


  const handleDeleteRow = (rowIndex, data, setData) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const userFilterFn = (row, columnId, filterValue) => {
    const user = row.getValue(columnId); // Get the user object
    if (!user || !filterValue) return true; // If no filterValue or user object is missing, show the row

    const searchTerm = filterValue.toLowerCase();
    const userName = user.name.toLowerCase();
    const userUsername = user.username.toLowerCase();

    // Check if either name or username contains the search term
    return userName.includes(searchTerm) || userUsername.includes(searchTerm);
  };


  const columns = [
    {
      accessorKey: 'user',
      header: 'User',
      cell: User,
      size: 200,
      enableColumnFilter: true,
      filterFn: userFilterFn,
    },
    {
      accessorKey: 'issue',
      header: 'Issue',
      cell: (props) => <p className='poppins-semibold text-[#1a3048cc]'>{props.getValue()}</p>,
      size: 150,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (props) => <p className='poppins-semibold text-[#1a3048cc]'>{props.getValue()}</p>,
      size: 150,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: StatusCell,
      size: 150,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DeleteIcon ClickFunction={() => handleDeleteRow(row.index, data, setData)} />
      ),
      size: 50,
    },
  ];



  // Table instance with resizing and row selection
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection: selectedRows,
      pagination,
    },
    onRowSelectionChange: setSelectedRows,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    columnResizeMode: 'onChange',
    defaultColumn: { size: 150 },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                ...prev[rowIndex],
                [columnId]: value,
              }
              : row
          )
        ),
    },
  });




  return (
    <>

      {ShowIssue ? <div className='text-[9px] sm:text-[10px] mdm:text-[12px] flex justify-center flex-col items-center montserrat poppins-regular h-screen '>
        {/* Table Start here */}

        <div className="table p-4  rounded-xl " style={{ width: table.getTotalSize() }}>

          <div className='flex items-center justify-between   mb-4'>
            <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
            <button
              onClick={() => { removeSelectedRows(); }}
              disabled={!Object.keys(selectedRows).length}
              className={`  p-2 px-4 rounded-2xl text-white   ${!Object.keys(selectedRows).length ? 'bg-red-500 opacity-50 cursor-not-allowed' : 'bg-red-500'}`}>
              Remove Selected Rows
            </button>
          </div>



          {/* Render Table Headers */}
          <div className='px-2 bg-[#F7F8FA] rounded-xl'>
            {table.getHeaderGroups().map((headerGroup) => (
              <div className="tr" key={headerGroup.id}>
                <div className="th">
                  <input
                    type="checkbox"
                    className='custom-checkbox'
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  />
                </div>
                {headerGroup.headers.map((header) => (
                  <div
                    className="th"
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.column.columnDef.header}

                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </div>


          {/* Render Table Rows */}
          <div className=' px-2  rounded-xl'>
            {table.getRowModel().rows.map((row) => (
              <div className="tr" key={row.id}>
                <div className="td">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selectedRows[row.index]}
                    onChange={() => {
                      // Toggle the selected row and then filter out rows with false values
                      setSelectedRows((prev) => {
                        const updatedRows = {
                          ...prev,
                          [row.index]: !prev[row.index],
                        };
                        // Remove rows with false values
                        const filteredRows = Object.fromEntries(
                          Object.entries(updatedRows).filter(([key, value]) => value !== false)
                        );
                        return filteredRows;
                      });
                    }}
                  />
                </div>
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="td" style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>


          <div className='flex items-center justify-between poppins-semibold'>
            <h1 >Total Users : </h1>
            <div className="flex items-center space-x-4 justify-center ">


              <div className="flex   items-center space-x-4 justify-center ">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-gray-700 ${!table.getCanPreviousPage() ? 'cursor-not-allowed opacity-50' : ''}`}>
                  {'<'}
                </button>

                <p className="">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </p>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-gray-700 ${!table.getCanNextPage() ? 'cursor-not-allowed opacity-50' : ''}`}>
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>


      </div> :
        <div className='border-2 border-red-500 size-[500px] bg-yellow-300'>Show Information of selected Row</div>
      }
    </>
  );
};

export default TaskTable;
