import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./Table.css"; // Custom CSS for styling
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";

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

const Table = () => {

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
    cell: (row) => (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button className="update-btn" onClick={() => handleUpdate(row)}>
          Update
        </button>
        <button className="delete-btn" onClick={() => handleDelete(row)}>
          Delete
        </button>
        <button className="view-btn" onClick={() => handleView(row)}>
          View
        </button>
      </div>
    ),
  },
];


  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState(""); // For searching trains
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility
  const [modalType, setModalType] = useState(null); // "update" or "view"
  const [selectedTrain, setSelectedTrain] = useState(null); // Selected train data
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

  // Handle updating train information
  const handleUpdate = (row) => {
    setSelectedTrain(row);
    setModalType("update");
    openModal();
  };

  // Handle viewing train details
  const handleView = (row) => {
    setSelectedTrain(row);
    setModalType("view");
    openModal();
  };

  // Handle deleting a train
  const handleDelete = (row) => {
    setData(data.filter(train => train.trainNumber !== row.trainNumber));
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

  // Close modal
  const closeModal = () => setModalIsOpen(false);

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrain({ ...newTrain, [name]: value });
  };

  // Add a new train to the list
  const addNewTrain = () => {
    setData([...data, newTrain]);
    closeModal();
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

  return (
    <div className="data-table-container">
      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search trains..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: "5px", width: "300px" }}
        />
        <button onClick={openModal} style={{ padding: "5px 10px" }}>
          Add Train
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
        <h2 style={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}>
          {modalType === "update" ? "Update Train Info" : "View Train Info"}
        </h2>
        <button type="button" onClick={closeModal} className="btn-close-right">
          <IoCloseOutline />
        </button>
        <form>
          <label>Train Number:</label>
          <input
            type="text"
            name="trainNumber"
            value={selectedTrain?.trainNumber || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Train Name:</label>
          <input
            type="text"
            name="train"
            value={selectedTrain?.train || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Route:</label>
          <input
            type="text"
            name="route"
            value={selectedTrain?.route || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Departure:</label>
          <input
            type="text"
            name="departure"
            value={selectedTrain?.departure || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Arrival:</label>
          <input
            type="text"
            name="arrival"
            value={selectedTrain?.arrival || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Departure Time:</label>
          <input
            type="text"
            name="depTime"
            value={selectedTrain?.depTime || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Fare:</label>
          <input
            type="text"
            name="fare"
            value={selectedTrain?.fare || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <label>Total Passengers:</label>
          <input
            type="text"
            name="totalPassengers"
            value={selectedTrain?.totalPassengers || ""}
            onChange={handleInputChange}
            disabled={modalType === "view"}
          />
          <br />
          <div className="btn">
            {modalType === "update" && (
              <button type="button" onClick={addNewTrain} className="btn-close" style={{ background: "red" }}>
                Update
              </button>
            )}
            <button type="button" onClick={closeModal} className="btn-close" style={{ background: "green" }}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Table;
