import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../components/hooks/useFetch/useFetch';
import {format} from 'date-fns';
import { DateRange } from 'react-date-range';
import './List.css';

const List = () => {

  // location
  const location = useLocation();
  
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  // open date
  const [openDate, setOpenDate] = useState(false);

  const PK = process.env.REACT_APP_PUBLIC_API;
  const {data, loading, reFetch} = useFetch(`${PK}/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);
  const handleSearch = () => {
    reFetch();
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="lsTitle">Search</div>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {
                openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />
              }
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e)=> setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e)=> setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.adults} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button className="lsOptionButton" onClick={handleSearch}>Search</button>
          </div>

          <div className="listResult">
            {
              data.map(item =>(
                <SearchItem key={item._id} item={item} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List