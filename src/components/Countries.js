import React, { useContext, useState } from "react";

import Paginator from './Paginator';

// Context
import { CountriesContext } from "../contexts/CountriesContext";

// Material-UI
import Button from '@material-ui/core/Button';

// Declare refs for our buttons
const nextButtonRef = React.createRef();
const prevButtonRef = React.createRef();

function Countries({ history }) {
  console.log("Countries rendering...");

  const { countries } = useContext(CountriesContext);
  console.log(countries[118]);

  // Fish out itemsPerPage from the localStorage.
  const itemsPerPage = 
    Number(window.localStorage.getItem('itemsPerPage'));
  
  // We declare the size of the first batch of countries
  // to display by setting sliceSize to 12 (countries) or
  // whatever number we retrieved from the localStorage.
  // sliceSize, sliceStart & sliceEnd are integers.
  const [sliceSize, setSliceSize]   = useState(itemsPerPage ? itemsPerPage : 12);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd]     = useState(sliceSize);

  const [iPPError, setIPPError]     = useState('');

  /**
   * validateSliceSize is a pure function that receives
   * two inputs, performs a number of checks on the
   * first input and returns an integer in its place.
   *
   * @param {*} sliceSizeInput
   * @param {*} dataArray
   * @returns {} Number
   */
  function validateSliceSize(sliceSizeInput, dataArray) {
    // Ensure chunkSize is a number.
    let chunkSize = Number(sliceSizeInput);

    // If chunkSize is a float, turn it into an integer..
    if (chunkSize % 1 !== 0) {
      chunkSize = Math.floor(chunkSize);
    }

    // If chunkSize is negative or it's not a number..
    if (
      chunkSize < 0 ||
      isNaN(chunkSize)
    ) {
      chunkSize = 12;
    }

    // If chunkSize is larger than the data (countries) size..
    if (chunkSize > dataArray.length) {
      chunkSize = dataArray.length;
    }

    return chunkSize;

  } // validateSliceSize
  
  /**
   * nextSlice is an impure function that modifies state; in
   * this case sliceStart and sliceEnd.
   *
   * @param {*} sliceSize
   * @param {*} dataArray
   * @returns {} undefined
   */
  function nextSlice(sliceSizeInput, dataArray) {
    if (nextButtonRef.current.disabled) {
      return;
    }
    const chunkSize = validateSliceSize(sliceSizeInput, dataArray);

    console.log('--chunkSize--')
    console.log(chunkSize)
    let start = sliceStart + chunkSize;
    let end   = sliceEnd + chunkSize;

    // At this point we know that there's room to click prev
    // so we enable the prev buttons.
    prevButtonRef.current.disabled = false;

    // Disable next when we surpass the maximum number of items.
    // The application actually wouldn't break, but it's good
    // practice.
    if (start > dataArray.length) {
      nextButtonRef.current.disabled = true;
      return;
    }

    // For visualization
    console.log('--nxt chunkSize--')
    console.log(chunkSize)
    console.log('--nxt start--')
    console.log(start)
    console.log('--nxt end--')
    console.log(end)
    console.log()
    console.log()

    setSliceStart(Math.floor(start));
    setSliceEnd(Math.floor(end));

  } // nextSlice

  
   /**
   * nextSlice is an impure function that modifies state; in
   * this case sliceStart and sliceEnd.
   *
   * @param {*} sliceSize
   * @param {*} dataArray
   * @returns {} undefined
   */
  function prevSlice(sliceSizeInput, dataArray, event) {
    if (prevButtonRef.current.disabled) {
      return;
    }

    const chunkSize = validateSliceSize(sliceSizeInput, dataArray);
    let start = sliceStart - chunkSize;
    let end   = sliceEnd - chunkSize;

    // At this point we know that there's room to click next
    // so we enable the next buttons.
    nextButtonRef.current.disabled = false;

    // Test for when we surpass index 0 tending towards
    // the negative.
    if (start < 0 || end < 0) {
      start = 0;
      end   = start + chunkSize;
      
      // At this point we know we've reached the first data item &
      // there's no more room to click so we disable the prev buttons.
      prevButtonRef.current.disabled = true;
      return;
    }

    // For visualization
    console.log('--prv chunkSize--')
    console.log(chunkSize)
    console.log('--prv start--')
    console.log(start)
    console.log('--prv end--')
    console.log(end)

    setSliceStart(Math.floor(start));
    setSliceEnd(Math.floor(end));

  } // prevSlice

  // Navigate to a given country's page upon clicking on it.
  const onClickHandler = country => {
    history.push(`/countries/${country.name.toLowerCase()}`);
  };

  const sliceSizeHandler = event => {
    const keyCode = event.keyCode;
    // If enter was pressed..
    if (keyCode === 13) {
      if (!!isNaN(Number(event.target.value))) {
        setIPPError('Items Per Page must be a Number');
      } 
      else {
        setSliceSize(event.target.value);
        window.localStorage.setItem('itemsPerPage', String(event.target.value));
        window.location.reload();
      }
      
      event.target.value = '';
    }
  } // sliceSizeHandler

  const onChangeHandler = () => {
    setIPPError('');
  } // onChangeHandler


  return (
    <>
      <div>
        <div id="itemsPerPageError">{iPPError && iPPError}</div>
        <input 
          placeholder="Items Per Page" 
          type="text"
          className="items-per-page"
          onChange = { onChangeHandler }
          onKeyUp={ event => sliceSizeHandler(event) }
          style={
            {
              textAlign: 'center',
              margin: '3px 0',
              marginRight: '5px',
              backgroundColor: 'black',
              padding: '2px',
              color: 'orange',
              height: '30px',
              fontSize: '1.2em',
              width: '180px'
            }
          }
        />{itemsPerPage || 12}
      </div>
      
      <div>
        <Paginator 
          pageSize= { sliceSize } 
          dataArray={ countries }
          validateSliceSize={ validateSliceSize }
        />
      </div>

      <div className="page-buttons-div">
        <div>
          <Button 
            id="prev-button1"
            ref={prevButtonRef}
            variant="contained"
            color="secondary"
            size="small"
            className="prev-lbutton pb-length" 
            onClick={ () => prevSlice(sliceSize, countries) }
          >
            {` <<< prev `}
          </Button>
        </div>

        <div>
          <Button 
            id="next-button1"
            ref={nextButtonRef}
            variant="contained" 
            color="secondary"
            size="small"
            className="next-rbutton pb-length"
            onClick={ (event) => nextSlice(sliceSize, countries) }
          >
            {` next >>> `}
          </Button>
        </div> <br/><br/>
      </div>
      
      <div className="countries">
        {countries &&
          countries
            .slice(sliceStart, sliceEnd)
            .map((country, index) => {
            
            // Extract the values we need from the country object.
            const {
              name, callingCodes, capital, region,
              subregion, population, flag, area 
            } = country;

            return (
              <div
                className="country-div animate fadeInUp country"
                key={index}
                onClick={() => onClickHandler(country)}
              >
                <table>
                  <thead>
                    <tr>
                      <th colSpan="2"><h1><strong>{name.toUpperCase()}</strong></h1></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <img
                          src={flag}
                          width={"100%"}
                          height={"150px"}
                          alt={`${name} flag`}
                          style={{
                            padding: "5px"
                          }}
                        />
                      </td>
                    </tr>
                    
                    <tr className="trow">
                      <td>{capital && 'Capital'}</td>
                      <td>{capital && capital}</td>
                    </tr>

                    <tr className="trow">
                      <td>{callingCodes[0] && 'Calling Code'}</td>
                      <td>{callingCodes && callingCodes}</td>
                    </tr>

                    <tr className="trow">
                      <td>{region && 'Region'}</td>
                      <td>{region && region}</td>
                    </tr>

                    <tr className="trow">
                      <td>{subregion && 'Sub Region'}</td>
                      <td>{subregion && subregion}</td>
                    </tr>

                    <tr className="trow">
                      <td>{'Population'}</td>
                      <td>
                        {
                          population ? 
                          (population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 
                          'Not provided!'
                        }
                      </td>
                    </tr>

                    <tr className="trow">
                      <td>{'Area (sq. Km)'}</td>
                      <td>
                        {
                          area ? 
                          (area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 
                          'Not provided!'

                        }
                      </td>
                    </tr>

                    <tr className="trow">
                      <td>{'People / (sq. Km)'}</td>
                      <td>
                        {
                          (
                            (population === 0) || 
                            ((population / area) === null) || 
                            ((population / area) === Infinity)
                          ) ? 
                          'Not computed!' : 
                          (
                            ((population / area) % 1 === 0) ? 
                            (population / area) :
                            (population / area).toFixed(5)
                          )
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            ); // return
          }) // countries.map
        }
      </div>

      <div className="page-buttons-divbottom">
        <Button 
          id="prev-button2"
          ref={prevButtonRef}
          variant="contained" 
          color="secondary"
          size="small"
          className="prev-lbutton pb-length" 
          onClick={ () => prevSlice(sliceSize, countries) }
        >
          {` <<< prev `}
        </Button>

        <Button 
          id="next-button2"
          ref={nextButtonRef}
          variant="contained" 
          color="secondary"
          size="small"
          className="next-rbutton pb-length"
          onClick={ () => nextSlice(sliceSize, countries) }
        >
          {` next >>> `}
        </Button> <br/>

     
    {/* These are left here for comparison with regular buttons */}
    {/* <button 
          id="prev-button2"
          color="primary"
          className="prev-lbutton pb-length" 
          onClick={ () => prevSlice(sliceSize, countries) }
        >{` prev <<< `}</button> 
        
        <button 
          id="next-button2"
          color="primary"
          className="next-rbutton pb-length" 
          onClick={ () => nextSlice(sliceSize, countries) }
        >{` next >>> `}</button> <br/> */}

      </div>
    </>
  ); // return
} // Countries

export default Countries;
