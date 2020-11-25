import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { SettingsContext } from '../../context/settings';
import { ListGroup, Pagination } from 'react-bootstrap';
function List(props) {
  const value = useContext(SettingsContext);
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
  function handlePageChange(page) {
    console.log(value.currentPage);
    value.setCurrentPage(page);
  }
  let list = sortList(props.list);
  list = list.filter(item => {
    if (value.hideCompleted) if (item.complete) return false;
    return true;
  });

  let pageList = list.slice(
    (value.currentPage - 1) * value.itemsPerPage,
    value.currentPage * value.itemsPerPage
  );
  // console.log('fdrom list componennt', list);

  let pages = [];
  let pagesCount = list.length / value.itemsPerPage;
  console.log(pagesCount);
  for (let number = 1; number <= pagesCount; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === value.currentPage}
        onClick={() => {
          handlePageChange(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  if (pages.length > 1 && value.currentPage !== pages.length) {
    pages.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          value.setCurrentPage(value.currentPage + 1);
        }}
      />
    );
  }
  if (pages.length > 1 && value.currentPage !== 1) {
    pages.unshift(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          value.setCurrentPage(value.currentPage - 1);
        }}
      />
    );
  }
  const paginationBasic = (
    <div>
      <Pagination>{pages}</Pagination>
    </div>
  );
  return (
    <>
      <ListGroup className="mine-list-group">
        {pageList.map(item => (
          <ListGroup.Item
            className={`complete-${item.complete.toString()} , list-group-item-action`}
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
      {paginationBasic}
    </>
  );
}

export default List;
