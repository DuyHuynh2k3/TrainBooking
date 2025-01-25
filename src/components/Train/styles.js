import styled from "styled-components";
import { btnReset, v } from "../../styles/variables";

export const SSSearch = styled.div`
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: ${v.borderRadius};
  width: 400px;
  margin-bottom: 15px;
  cursor: pointer;
  input {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100px;
    outline: none;
    border: none;
    color: inherit;
    background: transparent;
  }
  display: flex;
`;

export const AddTrain = styled.div`
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: ${v.borderRadius};
  width: 100px;
  margin-bottom: 15px;
  cursor: pointer;
  button {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100px;
    outline: none;
    border: none;
    color: inherit;
    background: transparent;
  }
  display: flex;
`;

export const SSSearchIcon = styled.button`
  ${btnReset}
  padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
  display: flex;
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`;

export const SContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 15px;
  box-sizing: border-box;
`;

export const ToolContainer = styled.div`
  display: flex; /* Đặt các phần tử con theo hàng ngang */
  justify-content: space-between; /* Đẩy Search và AddTrain ra 2 đầu */
  align-items: center; /* Căn giữa theo chiều dọc */
`;
export const Modal = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;