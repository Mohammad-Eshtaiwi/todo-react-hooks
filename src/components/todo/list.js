import React from 'react';
import { ListGroup } from 'react-bootstrap';
function list(props) {
  console.log(props);
  return (
    <>
      <ListGroup className="mine-list-group">
        {props.list.map(item => (
          <ListGroup.Item
            className={`complete-${item.complete.toString()} , list-group-item-action`}
            key={item._id}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <span className={item.complete ? 'bg-danger' : 'bg-success'}>
                  {item.complete ? 'completed' : 'pending'}
                </span>
                <span>assignee:{item.assignee}</span>
              </div>
              <button
                data-item={JSON.stringify(item)}
                onClick={e => {
                  props.deleteItem(e.target.dataset.item);
                }}
              >
                X
              </button>
              <button
                data-id={item._id}
                onClick={e => {
                  props.toggleComplete(e.target.dataset.id);
                }}
              >
                &#9745;
              </button>
            </div>
            <p className="mb-1">{item.text}</p>
            <small>difficulty:{item.difficulty}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default list;
