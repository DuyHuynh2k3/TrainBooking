import styled from "styled-components";

export const setUp = styled.div`
  display: flex;
`;

export const SContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1),
    /* Đổ bóng chìm nhẹ */ 0px 2px 4px rgba(0, 0, 0, 0.06);
`;
