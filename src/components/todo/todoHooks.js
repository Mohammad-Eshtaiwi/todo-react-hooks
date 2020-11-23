import React from 'react';
import React, { useState, useEffect } from 'react';
function todoHooks() {
  const [item, setItem] = useState({});
  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    this.props.handleSubmit(this.state.item);
    const item = {};
    this.setState({ item });
  };

  return <></>;
}

export default todoHooks;
