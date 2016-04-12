
import NukaCarousel from 'nuka-carousel';
import omit from 'lodash/omit';
import React from 'react';
import withState from 'recompose/withState';

import EmptyComponent from '../utils/EmptyComponent';
import LeftButton from '../utils/LeftButton';
import RightButton from '../utils/RightButton';

@withState('slide', 'setSlide', 1)
export default class Carousel extends React.Component {

  componentDidMount() {
    // Add window listeners for left or right keys
    window.addEventListener('keydown', this.handleRightOrLeftKeyPress);
  }

  componentWillUnmount() {
    // Remove left and right key listener
    window.removeEventListener('keydown', this.handleRightOrLeftKeyPress);
  }

  handleSlideChange = slide => {
    this.props.setSlide(() => slide + 1);
    this.props.onChange(slide + 1);
  };

  handleRightOrLeftKeyPress = event => {
    if (!this.refs.carousel) return;
    if (event.keyCode === 39) {
      // Right key press
      this.refs.carousel.nextSlide();
    } else if (event.keyCode === 37) {
      // Left key press
      this.refs.carousel.previousSlide();
    }
  };

  render() {
    const { children } = this.props;
    const props = omit(this.props, ['onChange', 'children']);

    const decorators = [
      { component: LeftButton, position: 'CenterLeft' },
      { component: RightButton, position: 'CenterRight' },
      { component: EmptyComponent }, // The dots at the bottom
    ];

    return (
      <NukaCarousel
        afterSlide={this.handleSlideChange}
        cellAlign="center"
        dragging
        slidesToShow={1}
        slidesToScroll={1}
        slideWidth={1}
        easing="easeOutQuad"
        edgeEasing="easeOutQuad"
        decorators={decorators}
        ref="carousel"
        slideIndex={this.props.slide}
        {...props}
      >
        {children}
      </NukaCarousel>
    );
  }
}
