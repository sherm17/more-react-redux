import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ area, details }) {
  const loHiImgPath = process.env.PUBLIC_URL + "/images/lohi.jpg";
  const capHillImgPath = process.env.PUBLIC_URL + "/images/cap-hill.jpg";
  const parkHillImgPath = process.env.PUBLIC_URL + "/images/park-hill.jpg";
  const rinoImgPath = process.env.PUBLIC_URL + "/images/rino.jpeg";
  const areaId = details.split("/").pop();
  let imgDisplay = null;
  switch (area) {
    case "RiNo":
      imgDisplay = rinoImgPath;
      break;
    case "Park Hill":
      imgDisplay = parkHillImgPath;
      break;
    case "LoHi":
      imgDisplay = loHiImgPath;
      break;
    case "Cap Hill":
      imgDisplay = capHillImgPath;
      break;
    default:
      break;
  }
  return (
    <article className="card">
      <div className="card__img-container">
        <img
          className="card__img"
          src={imgDisplay} alt=""
        />
      </div>
      <div className="card-text card__area">
        {area}
      </div>
      <div className="card-text card__listings">
        <Link to = {`/areas/${areaId}/listings`}>
          View Listings
        </Link>
      </div>
    </article>
  )
}

export default Card;