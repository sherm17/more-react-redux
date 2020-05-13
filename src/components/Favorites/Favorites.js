import React from 'react';
import Listing from '../Listing/Listing';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { addFav, removeFav } from '../../actions/favorites';


function Favorites({ favoritesList, removeFavorites }) {
  const favDisplay = favoritesList.map(fav => {
    return <Listing
      {...fav}
      key={uuid()}
      showFavButton={false}
      removeFavorites={removeFavorites}
    />
  })

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

const mapStateToProps = state => ({
  favoritesList: [...state.favorites.favoritesList]
});

const mapDispatchToProps = dispatch => ({
  toggleFavorites: listItem => dispatch(addFav(listItem)),
  removeFavorites: listItem => dispatch(removeFav(listItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);