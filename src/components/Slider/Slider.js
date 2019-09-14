import React, { Component } from "react";
import Slider from "react-slick";

import './Slider.scss'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const items = this.props.images.map(function(image, index) {
      return (
        <div key={index} >
          <img alt="" src={ require(`../../assets/projects/${image}`) } />
        </div>
      )
    })

    return (
      <div>
        <Slider {...settings}>
          { items }
        </Slider>
      </div>
    );
  }
}
