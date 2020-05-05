import React, { Component } from "react";
import Card from "../Card/Card";
import "./Areas.css";
import uuid from "react-uuid"

/*
  NEED TO UPDATE TO DISPLAY MORE INFORMATION IN EACH CARD
*/

class Areas extends Component {
  constructor() {
    super();
    this.state = {
      areas: null
    }
  }
  componentDidMount() {
    const areasAPIurl = "http://localhost:3001/api/v1/areas";
    fetch(areasAPIurl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const { areas } = json;
        this.setState({
          areas
        })
      })
      .catch(err => console.log("There was an error"));
  }

  render() {
    const { areas } = this.state;
    let cardDisplay = null
    if (areas) {
      cardDisplay = areas.map(eachArea => {
        const { area, details } = eachArea;
        return <Card
          area = {area}
          details = {details}
          key = {uuid()}
        />
      });
    }
    return (
      <div className="areas">
        {
          areas ? 
          cardDisplay :
          "Loading..."
        }
      </div>
    )
  }
}

export default Areas;