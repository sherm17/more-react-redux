import React from "react";
import Listing from "../Listing/Listing";
import uuid from "react-uuid";

function Favorites({ favorites, removeFavorites }) {
  console.log(favorites)
  console.log("In favorites");
  const favDisplay = favorites.map(fav => {
    return <Listing
      {...fav}
      key={uuid()}
      showFavButton = {false}
      removeFavorites = {removeFavorites}
    />
  })

  console.log(favDisplay)
  return (
    <div>
      {
        favDisplay.length > 0 ? 
        favDisplay 
        : 
        "You have no favorites!"
      }
    </div>  

  )
}

export default Favorites;