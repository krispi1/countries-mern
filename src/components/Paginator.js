import React from 'react';
import { Link } from 'react-router-dom';


function Paginator({ pageSize, dataArray, validateSliceSize }) {

  function paginate(pageSize, dataArray) {
    pageSize = validateSliceSize(pageSize, dataArray);
    
    const dataLength = dataArray.length;
    const numPages = Math.ceil(dataLength / pageSize);
    
    console.log('\n--pageSize--');
    console.log(pageSize);
    console.log('--numPages--');
    console.log(numPages);

    const pages = [];

    for (let i = 1; i <= numPages; i++) {
      pages.push(i);
    }

    return pages;

  } // paginate

  const buttons = paginate(pageSize, dataArray);

  return (
    <div>
      { 
        buttons && buttons.map(num => 
          <button 
            className="pageButton"
            key={ num }
            style={
              { 
                margin: '2px 2px', 
                padding: '3px 8px'
              }
            }
            onClick={ () => alert(num) }
          >
            { num }
          </button>
        )
      } 
    </div>
  )
} // Paginator

export default Paginator;
