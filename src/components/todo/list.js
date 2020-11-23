import React from 'react';
import { ListGroup } from 'react-bootstrap';
function list(props) {
  return (
    <>
      <ListGroup className="mine-list-group">
        {props.list.map(item => (
          <ListGroup.Item
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            onClick={() => props.handleComplete(item._id)}
          >
            {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default list;
