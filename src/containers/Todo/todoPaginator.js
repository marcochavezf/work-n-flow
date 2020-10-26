import React from 'react';
import Button from '../../components/uielements/button';

export default function TodoPaginator(props) {

  const { updateDaysAgo, daysAgo } = props;
  return (
    <div className="todoPagination">
      <Button
        icon="left"
        className="paginationButton"
        onClick={() => updateDaysAgo(daysAgo + 1)}
      />
      <span className="spanTodoPagination">
        {daysAgo === 0 ?
          'Today' :
          daysAgo === 1 ?
            'Yesterday' :
            `${daysAgo} days ago`}
      </span>
      <Button
        icon="right"
        className="paginationButton"
        disabled={daysAgo === 0}
        onClick={() => updateDaysAgo(daysAgo - 1)}
      />
    </div>
  )
}