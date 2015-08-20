/**
 * This component represents a carousel with sheet music in it, such as the one on the homepage.
 */

import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import Slider from 'react-slick';

import ResponsiveContainer from './ResponsiveContainer';
import SheetMusicThumbnail from './SheetMusicThumbnail';

export default React.createClass({

  propTypes: {
    /**
     * The class name we want to attach to the object.
     */
    className: React.PropTypes.string,

    /**
     * The text to put above the panel.
     */
    title: React.PropTypes.string,

    /**
     * The sheet music objects to display.
     */
    sheetMusic: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  render() {
    const responsive = [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ];

    const settings = {
      responsive,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      lazyLoading: false,
      prevArrow: 'a',
      nextArrow: 'a',
    };

    const className = classNames('sheet-music-carousel__container', this.props.className);

    return (
      <div className={className}>
        <ResponsiveContainer absolute={false}>
          <h2 className="sheet-music-carousel__title">{this.props.title}:</h2>
        </ResponsiveContainer>
        <If condition={this.props.sheetMusic.length !== 0}>
          <div className="sheet-music-carousel__slider">
            <Slider {...settings} className="sheet-music-carousel__slick">
              {this.props.sheetMusic.map(sheetMusic => (
                <SheetMusicThumbnail sheetMusic={sheetMusic}
                  key={sheetMusic.id} />
              ))}
            </Slider>
          </div>
        <Else />
          <div className="sheet-music-carousel__spinner">
            <FontAwesome name="cog" spin={true} size="2x" />
          </div>
        </If>
      </div>
    );
  },

});

