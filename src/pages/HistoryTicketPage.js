import React from "react";
import "./style";
import Table from "../components/HistoryTicket/Table";
import { SContainer } from "./style";

const HistoryTicketPage = () => {
  return (
    <setUp>
      <h1>Lịch Sử Đặt Vé</h1>
      <SContainer>
        <Table></Table>
      </SContainer>
    </setUp>
  );
};

export default HistoryTicketPage;
