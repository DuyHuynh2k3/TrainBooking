import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { data } from "./data";
import "./Table.css"; // Thêm CSS để styling dropdown

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "rgb(230,230,230)",
      fontSize: "17px",
      fontWeight: "bolder",
    },
  },
};

const DropdownMenu = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleAction = (action) => {
    alert(`${action} clicked for ${row.fullName}`);
    setIsOpen(false); // Đóng menu sau khi click
  };

  return (
    <div
      className="dropdown"
      onMouseLeave={closeMenu} // Tắt menu khi di chuột ra ngoài
    >
      <button className="dropdown-button" onClick={toggleMenu}>
        &#x22EE; {/* Dấu ba chấm dọc */}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div onClick={() => handleAction("Read")} className="dropdown-item">
            Read
          </div>
          <div onClick={() => handleAction("Edit")} className="dropdown-item">
            Edit
          </div>
          <div onClick={() => handleAction("Delete")} className="dropdown-item">
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

const columns = [
  {
    name: "CCCD",
    selector: (row) => row.cccd,
  },
  {
    name: "Họ và tên",
    selector: (row) => row.fullName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    minWidth: "-1px",
  },
  // {
  //   name: "Số điện thoại",
  //   selector: (row) => row.phoneNumber,
  // },
  {
    name: "Ga đi",
    selector: (row) => row.trainStart,
    sortable: true,
  },
  {
    name: "Ga đến",
    selector: (row) => row.trainArrives,
  },
  {
    name: "Action",
    cell: (row) => <DropdownMenu row={row} />,
  },
];

const Table = () => {
  return (
    <div className="data-table-container">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
};

export default Table;
