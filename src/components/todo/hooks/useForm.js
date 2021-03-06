import { useState } from 'react';
// CUSTOME HOOKS START WITH "use"
const useForm = cb => {
  const [state, setState] = useState({});
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Hello from submit');
    cb(e);
  };
  const handleChange = e => {
    console.log([e.target.name]);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return [state, handleChange, handleSubmit];
};

export default useForm;
