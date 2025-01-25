import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { data } from "./data";
import "./Table.css"; // Thêm CSS để styling dropdown
import { AddTrain, SContainer, SSSearch, SSSearchIcon,ToolContainer,Modal} from "./styles";
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
    name: "Số hiệu tàu",
    selector: (row) => row.TrainNumber,
    minWidth: "150px", // Độ rộng tối thiểu
    maxWidth: "150px", // Độ rộng tối đa (tuỳ chọn)
  },
  {
    name: "Tên tàu",
    selector: (row) => row.Train,
    minWidth: "150px",
  },
  {
    name: "Lộ trình",
    selector: (row) => row.Route,
    minWidth: "150px", // Đặt độ rộng cho cột lớn hơn
  },
  {
    name: "Điểm khởi hành",
    selector: (row) => row.Departure,
    minWidth: "150px",
  },
  {
    name: "Điểm đến",
    selector: (row) => row.Arrival,
    minWidth: "150px",
  },
  {
    name: "Thời gian khởi hành",
    selector: (row) => row.DepTime,
    minWidth: "200px",
  },
  {
    name: "Giá vé",
    selector: (row) => row.Fare,
    minWidth: "100px",
  },
  {
    name: "Tổng số hành khách",
    selector: (row) => row.TotalPassengers,
    minWidth: "200px",
  },
  {
    name: "Action",
    cell: (row) => <DropdownMenu row={row} />,
    minWidth: "100px",
  },
];


const Table = () => {
  const [records, setRecords] = useState(data); // Move useState here
  const searchRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTrain = Object.fromEntries(formData.entries());
    console.log(newTrain); // Dữ liệu tàu mới
    setIsModalOpen(false); // Đóng modal sau khi thêm
  };
  

  const searchClickHandler = () => {
    searchRef.current.focus();
  };

  return (
    <SContainer>
      <ToolContainer>
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
      <AddTrain>
      <button onClick={() => setIsModalOpen(true)} className="btn-add">
       + ADD
      </button>
    </AddTrain>
      </ToolContainer>
      <div className="data-table-container">
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
        />
      </div>
      {isModalOpen && (
  <Modal>
    <div className="modal-content">
      <h2>Thêm Tàu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Số hiệu tàu</label>
          <input type="text" placeholder="Nhập số hiệu tàu" name="TrainNumber" required />
        </div>
        <div className="form-group">
          <label>Tên tàu</label>
          <input type="text" placeholder="Nhập tên tàu" name="TrainName" required />
        </div>
        <div className="form-group">
          <label>Lộ trình</label>
          <input type="text" placeholder="Nhập lộ trình" name="Route" required />
        </div>
        <div className="form-group">
          <label>Điểm khởi hành</label>
          <input type="text" placeholder="Nhập điểm khởi hành" name="Departure" required />
        </div>
        <div className="form-group">
          <label>Điểm đến</label>
          <input type="text" placeholder="Nhập điểm đến" name="Arrival" required />
        </div>
        <div className="form-group">
          <label>Thời gian khởi hành</label>
          <input type="time" name="DepTime" required />
        </div>
        <div className="form-group">
          <label>Giá vé</label>
          <input type="number" placeholder="Nhập giá vé" name="Fare" required />
        </div>
        <div className="form-group">
          <label>Tổng số hành khách</label>
          <input type="number" placeholder="Nhập tổng số hành khách" name="TotalPassengers" required />
        </div>
        <div className="form-actions">
          <button type="submit">Lưu</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Đóng
          </button>
        </div>
      </form>
    </div>
  </Modal>
  )}
    </SContainer>
  );
};
export default Table;
