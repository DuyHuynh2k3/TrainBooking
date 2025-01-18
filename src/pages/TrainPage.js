import React from "react";
import "./style";
import Table from "../components/Train/Table";
import { SContainer } from "../components/HistoryTicket/styles";

const TrainPage = () => {
  return (
    <setUp>
      <h1>Thông tin tàu</h1>
      <SContainer>
        <Table></Table>
      </SContainer>
    </setUp>
  );
};

export default TrainPage;
