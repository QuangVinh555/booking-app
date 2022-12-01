import React from 'react';
import { Link } from 'react-router-dom';
import './SearchItem.css';

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img 
            src={item.photos[0] || "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"}
            alt=""
            className="siImg"
        />

        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">500m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">Studio Apartment with Air conditioning</span>
            <span className="siFeatures">Entire studio • 1 bathroom • 21m² 1 full bed</span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
        </div>

        <div className="siDetails">
            {
                item.rating && 
                <div className="siRaiting">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
            }
            <div className="siDetailTexts">
                <span className="siPrice">{item.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to ={`/hotels/${item._id}`}>
                    <button className="siCheckButton">See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem