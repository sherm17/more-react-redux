import React, { Component } from 'react'
import Card from '../Card/Card'
import './Areas.css'
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import { fetchAreas } from '../../actions/areas';

/*
  NEED TO UPDATE TO DISPLAY MORE INFORMATION IN EACH CARD
*/

class Areas extends Component {
  componentDidMount () {
    const areasAPIurl = 'http://localhost:3001/api/v1/areas'
    this.props.fetchAreas(areasAPIurl);
  }

  render () {
    const { areas, fetchSuccess, loading } = this.props
    let cardDisplay = null
    if (areas) {
      cardDisplay = areas.map(eachArea => {
        const { area, details } = eachArea
        return <Card area={area} details={details} key={uuid()} />
      });
    }
    return (
      <div className='areas'>
        {
          loading ? 
          'Loading...' : 
            fetchSuccess ? 
            cardDisplay : 
            'Error'
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    areas: state.areas.areasList,
    fetchSuccess: state.areas.fetchSuccess,
    loading: state.areas.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAreas: url => dispatch(fetchAreas(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Areas);
