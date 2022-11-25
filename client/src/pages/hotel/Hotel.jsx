import React, { useContext, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import './Hotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../../components/hooks/useFetch/useFetch';
import { SearchContext } from '../../context/SearchContext';

const Hotel = () => {
  const PK = process.env.REACT_APP_PUBLIC_API;
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  // vt của img
  const [slideNumber, setSlideNumber] = useState(0);
  // open big Img
  const [open, setOpen] = useState(false);

  const handelOpen = (index) => {
    console.log(index)
    setSlideNumber(index);
    setOpen(true);
  }

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const {data, loading} = useFetch(`${PK}/hotels/${id}`);
  
  const {dates} = useContext(SearchContext);
  
  const MILLISECONDS = 1000*60*60*24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS);
    return diffDays;
  }
  
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {
          open && 
          <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=> slideNumber <= 0  ? 0 :setSlideNumber(slideNumber - 1)} />
              <div className="sliderWrapper">
                <img src={photos[slideNumber].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=> slideNumber >= 5 ? 5 : setSlideNumber(slideNumber + 1)} />
          </div>
        }
        <div className="hotelWrapper">
          <div className="hotelHeader">
            <div className="hotelTitles">
              <h1 className="hotelName">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Elton St 125 New york</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hotelPriceHightLight">
                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
              </span>
            </div>
            <button className="hotelTitlesButton">Reserve or Book now!</button>
          </div>
          <div className="hotelImages">
          {
            photos.map((photo,index) => (
              <div className="hotelImgWrapper" key={index}>
                <img onClick={()=>handelOpen(index)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))
          }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <p>
                Located in the real heart of Krakow, this property has 
                an excellent location score of 9.8!
              </p>
              <h2>
                <b>${days*data.cheapestPrice}</b> ({days} nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      <MailList />
      </div>
      <Footer />
    </div>
  )
}

export default Hotel