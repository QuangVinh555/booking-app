import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch/useFetch';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './Reserve.css';
import axios from 'axios';

const Reserve = ({setOpen, hotelId}) => {
  const PK = process.env.REACT_APP_PUBLIC_API;
  const {data, loading, error} = useFetch(`${PK}/hotels/room/${hotelId}`);
  const [checkedRoom, setCheckedRoom] = useState([]);
  const handleChecked = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setCheckedRoom(checked ? [...checkedRoom, value] : checkedRoom.filter(item => item !== value));
  }
  const {dates} = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    
    const lists = [];
    while(date <= end){
      lists.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return lists;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log(alldates)
  const isAvailable = (roomNumber) =>{
    console.log(roomNumber)
    const isFound = roomNumber.unavailableDates.some(date => (
      alldates.includes(new Date(date).getTime())
    ));
    return !isFound;
  }
  const handleClick = async() => {
    try {
      await Promise.all(checkedRoom.map(roomId =>{
        const res = axios.put(`${PK}/rooms/availability/${roomId}`, {dates: alldates});
        return res.data;
      }))
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="reserve">
        <div className="rContainer">
          <FontAwesomeIcon 
            icon={faCircleXmark} 
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {
            data.map(item => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {
                    item.roomNumbers.map(roomNumber => (
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input 
                          type="checkbox" 
                          value={roomNumber._id} 
                          onChange={handleChecked} 
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                        
                    ))
                  }
                </div>
              </div>
            ))
          }
          <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve