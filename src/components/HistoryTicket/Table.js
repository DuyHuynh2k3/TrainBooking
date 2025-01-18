import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { data } from "./data";
import "./Table.css"; // Thêm CSS để styling dropdown
import { SContainer, SSSearch, SSSearchIcon } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";

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
      style={{ position: "relative" }} // Đảm bảo dropdown được định vị đúng
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
    minWidth: "300px",
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
  const [records, setRecords] = useState(data); // Move useState here
  const searchRef = useRef(null);

  const handleChange = (e) => {
    const query = e.target.value.toLocaleLowerCase(); // Chuyển query về chữ thường

    const newRecords = data.filter((item) => {
      // Duyệt qua tất cả giá trị của các thuộc tính trong item
      return Object.values(item)
        .map((value) => (value ?? "").toString().toLocaleLowerCase()) // Chuyển đổi tất cả giá trị về chuỗi chữ thường
        .some((value) => value.includes(query)); // Kiểm tra nếu bất kỳ giá trị nào chứa query
    });

    setRecords(newRecords);
  };

  const searchClickHandler = () => {
    searchRef.current.focus();
  };

  return (
    <SContainer>
      <SSSearch onClick={searchClickHandler}>
        <SSSearchIcon>
          <AiOutlineSearch />
        </SSSearchIcon>
        <input
          type="text"
          ref={searchRef}
          placeholder="Search"
          onChange={handleChange}
        />
      </SSSearch>
      <div className="data-table-container">
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
        />
      </div>
    </SContainer>
  );
};

export default Table;
