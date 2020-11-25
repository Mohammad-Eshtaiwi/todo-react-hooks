import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../../context/settings';
import { ListGroup } from 'react-bootstrap';
function List(props) {
  const value = useContext(SettingsContext);
  function displayOrNot(item) {
    if (value.hideCompleted) if (item.complete) return 'd-none';
    return '';
  }
  function sortList(list) {
    return list.sort(function (a, b) {
      // console.log('sorting');
      if (value.sort === 'text') {
        var nameA = a[value.sort].toUpperCase(); // ignore upper and lowercase
        var nameB = b[value.sort].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
      if (value.sort === 'difficulty') {
        return a[value.sort] - b[value.sort];
      }
    });
  }
  let list = sortList(props.list);
  // console.log('fdrom list componennt', list);
  return (
    <>
      <ListGroup className="mine-list-group">
        {list.map(item => (
          <ListGroup.Item
            className={`complete-${
              item.complete.toString() + ' ' + displayOrNot(item)
            } , list-group-item-action`}
            key={item._id}
          >
            {/* {console.log(item)} */}
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

export default List;
