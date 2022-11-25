import React from 'react';
import useFetch from '../hooks/useFetch/useFetch';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
    const PK = process.env.REACT_APP_PUBLIC_API;
    const {data, loading} = useFetch(`${PK}/hotels?featured=true&limit=4`);

  return (
    <div className="fp">
        {
            loading ? "Loading..." : 
            <>
                {
                    data.map((item,index) => (
                        <div className="fpItem" key={index}>
                            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1" alt="" className="fpImg" />
                            <div className="fpTitles">
                                <h1 className="fpName">{item.name}</h1>
                                <h2 className="fpCity">{item.city}</h2>
                                <h2 className="fpPrice">{`Starting from ${item.cheapestPrice}`}</h2>
                                {
                                    item.rating && 
                                    <div className="fpRating">
                                        <button>{item.rating}</button>
                                        <span>Excellent</span>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </>
        }      
    </div>
  )
}

export default FeaturedProperties