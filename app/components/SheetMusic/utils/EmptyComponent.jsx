/**
 * The purpose of this component is so that we can feed an empty component into nuka-carousel. We'll
 * need to do this to indicate that we don't want dots on our carousel. Having a component like this
 * also helps prevent the need of CSS display: none hacks to make the dots disappear.
 */

import React from 'react';

export default React.createClass({
  render() {
    return null;
  },
});
