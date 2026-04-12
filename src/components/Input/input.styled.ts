import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export const SInputField = styled(TextField)`
  display: flex;
  color: #1E1A2E;
  background: #F9F8FF;
  width: 99%;
  border-radius: 10px;
`;

export const SInput = styled(TextField)`
  & {
    display: flex;
    width: 100%;
    color: #1E1A2E;
    background: #F0EEF9;
    border-radius: 30px;
    padding: 2px 8px;

    & .MuiInputBase-root {
      border-radius: 30px;
    }
  }
`;

export const SMultilineInput = styled(TextField)`
  & {
    display: flex;
    width: 90%;
    min-height: 80px;
    color: #1E1A2E;
  }
`;

export const SPhoneDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const SFlagDiv = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

export const SFileUpload = styled(Button)`
  & {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 42px;
    border-radius: 4px;
    color: #1E1A2E;
    background: #F9F8FF;
    text-transform: none;
  }
`;
