import styled from "styled-components";
import { Field } from "formik";
import DatePicker from "react-datepicker";

const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

const InputStyle = styled(Field)`
  padding: 0.5rem 1rem;
  border: 1px solid #999;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  width: 100%;
`;

const CheckboxStyle = styled(Field)``;
const RadioStyle = styled(Field)``;
const SelectStyle = styled(Field)`
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const DateInput = styled(DatePicker)`
  padding: 0.5rem 1rem;
  border: 1px solid #999;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  width: 100%;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  width: 100%;
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 1rem;
`;

const Error = styled.div`
  color: red;
`;

export {
  Button,
  Logo,
  Card,
  Error,
  InputStyle,
  DateInput,
  Select,
  CheckboxStyle,
  RadioStyle,
  SelectStyle,
};
