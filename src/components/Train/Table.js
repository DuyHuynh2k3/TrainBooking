import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./Table.css"; // Custom CSS for styling
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

// Initial sample data
const initialData = [
  {
    trainNumber: "CA-007",
    train: "Black Water",
    route: "Chicago - Carbondale",
    departure: "Chicago",
    arrival: "Carbondale",
    depTime: "7:00 AM",
    fare: "$33",
    totalPassengers: 195,
  },
  {
    trainNumber: "CA-107",
    train: "Colonial",
    route: "Boston - New York",
    departure: "Boston",
    arrival: "New York",
    depTime: "10:45 AM",
    fare: "$35",
    totalPassengers: 255,
  },
  {
    trainNumber: "CA-207",
    train: "Silver Star",
    route: "New Orleans - Los Angeles",
    departure: "New Orleans",
    arrival: "Los Angeles",
    depTime: "8:45 AM",
    fare: "$149",
    totalPassengers: 190,
  },
];

// Custom styles for DataTable
const customStyles = {
  headCells: {
    style: {
      backgroundColor: "rgb(230,230,230)",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      textAlign: "center",
    },
  },
};

// Dropdown Menu Component
const DropdownMenu = ({ row, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleAction = (action) => {
    onAction(action, row); // Gọi hàm xử lý hành động
    closeMenu(); // Đóng menu sau khi chọn
  };

  return (
    <div
      className="dropdown"
      onMouseLeave={closeMenu} // Đóng menu khi di chuột ra ngoài
    >
      <button className="dropdown-button" onClick={toggleMenu}>
        &#x22EE; {/* Dấu ba chấm dọc */}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div onClick={() => handleAction("View")} className="dropdown-item">
            View
          </div>
          <div onClick={() => handleAction("Update")} className="dropdown-item">
            Update
          </div>
          <div onClick={() => handleAction("Delete")} className="dropdown-item">
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

const Table = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState(""); // For searching trains
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility
  const [modalType, setModalType] = useState(null); // "add", "update", or "view"
  const [newTrain, setNewTrain] = useState({
    trainNumber: "",
    train: "",
    route: "",
    departure: "",
    arrival: "",
    depTime: "",
    fare: "",
    totalPassengers: "",
  });

  const handleAction = (action, row) => {
    if (action === "View") {
      handleView(row);
    } else if (action === "Update") {
      handleUpdate(row);
    } else if (action === "Delete") {
      handleDelete(row);
    }
  };

  // Table column configuration
  const columns = [
    {
      name: "Train Number",
      selector: (row) => row.trainNumber,
      sortable: true,
    },
    {
      name: "Train",
      selector: (row) => row.train,
      sortable: true,
    },
    {
      name: "Route",
      selector: (row) => row.route,
    },
    {
      name: "Departure",
      selector: (row) => row.departure,
    },
    {
      name: "Arrival",
      selector: (row) => row.arrival,
    },
    {
      name: "Dep. Time",
      selector: (row) => row.depTime,
    },
    {
      name: "Fare",
      selector: (row) => row.fare,
    },
    {
      name: "Total Passengers",
      selector: (row) => row.totalPassengers,
    },
    {
      name: "Actions",
      cell: (row) => <DropdownMenu row={row} onAction={handleAction} />,
    },
  ];

  // Handle adding a new train
  const handleAdd = () => {
    setModalType("add");
    setNewTrain({
      trainNumber: "",
      train: "",
      route: "",
      departure: "",
      arrival: "",
      depTime: "",
      fare: "",
      totalPassengers: "",
    });
    openModal();
  };

  // Handle updating a train
  const handleUpdate = (row) => {
    setModalType("update");
    setNewTrain(row);
    openModal();
  };

  // Handle viewing train details
  const handleView = (row) => {
    setModalType("view");
    setNewTrain(row);
    openModal();
  };

  // Handle deleting a train
  const handleDelete = (row) => {
    setData(data.filter((train) => train.trainNumber !== row.trainNumber));
  };

  // Handle searching for trains
  const filteredData = data.filter(
    (item) =>
      item.trainNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.train.toLowerCase().includes(searchText.toLowerCase()) ||
      item.route.toLowerCase().includes(searchText.toLowerCase())
  );

  // Open modal
  const openModal = () => setModalIsOpen(true);

  // Close modal and reset state
  const closeModal = () => {
    setModalIsOpen(false);
    setNewTrain({
      trainNumber: "",
      train: "",
      route: "",
      departure: "",
      arrival: "",
      depTime: "",
      fare: "",
      totalPassengers: "",
    });
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrain({ ...newTrain, [name]: value });
  };

  // Save or update train
  const saveOrUpdateTrain = () => {
    if (modalType === "add") {
      setData([...data, newTrain]);
    } else if (modalType === "update") {
      setData(
        data.map((train) =>
          train.trainNumber === newTrain.trainNumber ? newTrain : train
        )
      );
    }
    closeModal();
  };

  return (
    <div className="data-table-container">
      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search trains..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search"
        />
        <FiSearch className="search-icon" />
        <button onClick={handleAdd} style={{ padding: "10px 20px",
        height: "50px",
        backgroundColor: "#ff6600",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s ease" }}>
          + Add Train
        </button>
      </div>

      {/* Data table */}
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
        striped
        highlightOnHover
      />

      {/* Modal for adding or updating train */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2 style={{ textAlign: "center", padding: "10px 0" }}>
          {modalType === "add"
            ? "Add New Train"
            : modalType === "update"
            ? "Update Train Info"
            : "View Train Info"}
        </h2>
        <button type="button" onClick={closeModal} className="btn-close-right">
          <IoCloseOutline />
        </button>
        <form>
          <label>Train Number:</label>
          <input
            type="text"
            name="trainNumber"
            value={newTrain.trainNumber}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Train Name:</label>
          <input
            type="text"
            name="train"
            value={newTrain.train}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Route:</label>
          <input
            type="text"
            name="route"
            value={newTrain.route}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Departure:</label>
          <input
            type="text"
            name="departure"
            value={newTrain.departure}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Arrival:</label>
          <input
            type="text"
            name="arrival"
            value={newTrain.arrival}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Departure Time:</label>
          <input
            type="text"
            name="depTime"
            value={newTrain.depTime}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Fare:</label>
          <input
            type="text"
            name="fare"
            value={newTrain.fare}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Total Passengers:</label>
          <input
            type="text"
            name="totalPassengers"
            value={newTrain.totalPassengers}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          {modalType !== "view" && (
            <button type="button" onClick={saveOrUpdateTrain} className="btn-save">
              {modalType === "add" ? "Add" : "Update"}
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default Table;
