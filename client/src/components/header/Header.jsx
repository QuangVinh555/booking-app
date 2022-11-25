import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBed, faPlane, faCar, faTaxi, faCalendarDays, faPerson} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import {format} from 'date-fns';
import './Header.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


const Header = ({type}) => {

    // destinationSearch onChange
    const [destination, setDestination] = useState("")

    // Date
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    // Option
    const [openOption, setOpenOption] = useState(false);
    const [options, setOptions] = useState(
        {
          adults: 0,
          children: 0,
          room: 0
        }
    );

    // counter
    const handleCounter = (name, operation) => {
        setOptions(prev=>{
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const navigate = useNavigate();
    const {searchDates} = useContext(SearchContext);
    const handleSearch = () => {
        const search = {
            destination,
            date,
            options
        }
        searchDates(search);
        navigate('hotels', {state: {destination, date, options}})
    }
    const {user} = useContext(AuthContext);
  return (
    <div className="header">
       <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
            {type !== "list" && 
            <>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">Get rewarded for your travels – unlock instant savings of 
                    10% or more with a free bagobooking account
                </p>
                {!user && <button className="headerBtn">Sign in / Register</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} />
                        <input 
                            type="text" 
                            className="headerSearchInput" 
                            placeholder="Where are you going?"
                            onChange={(e)=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {
                            openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                            minDate={new Date()}
                        />
                        }
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} />
                        <span onClick={() => setOpenOption(!openOption)} className="headerSearchText">{`${options.adults} adults - ${options.children} children - ${options.room} room `}</span>          
                        {openOption &&
                            <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adults <= 0} className="optionCounterButton" onClick={()=>handleCounter('adults', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.adults}</span>
                                        <button className="optionCounterButton" onClick={()=>handleCounter('adults', 'i')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleCounter('children', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={()=>handleCounter('children', 'i')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button disabled={options.room <= 0} className="optionCounterButton" onClick={()=>handleCounter('room', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={()=>handleCounter('room', 'i')}>+</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>         
                    </div>
                </div>    
            </>}
       </div>
    </div>
  )
}

export default Header