import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/settings';
import { Form } from 'react-bootstrap';
export default function Settings() {
  const value = useContext(SettingsContext);
  return (
    <Form className="mt-1">
      <Form.Group controlId="hide-compleated">
        <Form.Check
          type="checkbox"
          label="Hide compleated"
          onClick={() => {
            value.setHideCompleted(!value.hideCompleted);
          }}
        />
      </Form.Group>
      <Form.Group controlId="sortby">
        <Form.Label>sortby</Form.Label>
        <Form.Control
          as="select"
          defaultValue="text"
          onChange={e => {
            value.setSort(e.target.value);
          }}
        >
          <option value="text">text</option>
          <option value="difficulty">difficulty</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}
