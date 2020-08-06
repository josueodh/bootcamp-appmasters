import React from 'react';
import Button from '@material-ui/core/Button';

const Pagination = ({ ...props }) => {
  const stateNumbers: Array<any> = [];
  let next = props.currentPage + 1;
  let previous = props.currentPage - 1;
  for (let i: number = 1; i <= Math.ceil(props.totalState / props.statePerPage); i++) {
    stateNumbers.push(i);
  }
  return (
    <nav className="center-nav mt-10">
      <ul className="MuiPagination-ul">
        <li key="previous">
          {props.currentPage != 1 ?
            <Button onClick={() => props.paginate(previous)} variant="contained" color="default" className="page-link">
              Anterior
          </Button> : null}
        </li>
        {stateNumbers.map(number => (
          <li key={number} className="page-item">
            {(number == props.currentPage) ?
              <Button onClick={() => props.paginate(number)} variant="contained" color="primary" className="page-link">
                {number}
              </Button> : <Button onClick={() => props.paginate(number)} variant="contained" color="default" className="page-link primary">
                {number}
              </Button>}
          </li>
        ))}
        <li key="next">
          {props.currentPage != stateNumbers.length ?
            <Button onClick={() => props.paginate(next)} variant="contained" color="default" className="page-link primary">
              Próxima
          </Button> : null}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;