
// Import external modules
import React from 'react';
import { Navigation } from 'react-router';

// Export component
export default React.createClass({

  mixins: [Navigation],

  propTypes: {
    // ID of the sheet music
    id: React.PropTypes.number,

    // Name of the sheet music
    name: React.PropTypes.string.isRequired,

    // URL of the sheet music thumbnail
    thumbnail: React.PropTypes.string.isRequired,

    // Style of the sheet music
    musicStyle: React.PropTypes.string.isRequired,

    // Composer of the sheet music
    composer: React.PropTypes.string.isRequired,
  },

  /**
   * The reason we are doing this is because sheet music thumbnails can be part of
   * carousels, and therefore there needs to be a way to check if a user is dragging
   * on this component versus clicking it.
   */
  componentDidMount() {
    let link = this.refs.link.getDOMNode();
    let currentMousePointX = null;
    let currentMousePointY = null;

    // Disable click events for link
    link.addEventListener('click', event => event.preventDefault());

    // Track whether there's a difference between X and Y coordinates when clicking
    link.addEventListener('mousedown', event => {
      currentMousePointX = event.clientX;
      currentMousePointY = event.clientY;
    });

    // If it's the same (i.e the user did not drag) then make the route transition
    link.addEventListener('mouseup', event => {
      if (event.clientX === currentMousePointX &&
          event.clientY === currentMousePointY) {
        console.log('you intend to go to some sheet music');
      }
    });
  },

  render() {
    let href = '#'; // this.makeHref('sheetmusic', { id: this.props.id })

    let musicStyle = null;
    if (this.props.musicStyle) {
      musicStyle = (
        <span>
          <strong className="sheet-music-thumbnail__description--bold">{this.props.musicStyle}</strong>
          &nbsp;by&nbsp;
        </span>
      );
    }

    return (
      <a ref="link" href={href} className="sheet-music-thumbnail__link"
        title={`${this.props.name} - ${this.props.musicStyle} by ${this.props.composer}`}>
        <div className="sheet-music-thumbnail">
          <div className="sheet-music-thumbnail__thumbnail"
            style={{backgroundImage: `url(${this.props.thumbnail})`}} />
          <div className="sheet-music-thumbnail__title">
            {this.props.name}
          </div>
          <div className="sheet-music-thumbnail__description">
            {musicStyle}
            <strong className="sheet-music-thumbnail__description--bold">{this.props.composer}</strong>
          </div>
        </div>
      </a>
    );
  },

});
