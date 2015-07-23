
import React from 'react';
import { Link } from 'react-router';

import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default React.createClass({
  render() {
    return (
      <div className="footer">
        <ResponsiveContainer className="footer__text">
          &copy; PianoShelf 2015
          &nbsp;-&nbsp;
          <Link className="footer__link" to="/copyright">Copyright</Link>
          &nbsp;-&nbsp;
          <Link className="footer__link" to="/terms">Terms of Service</Link>
          &nbsp;-&nbsp;
          <Link className="footer__link" to="/privacypolicy">Privacy Policy</Link>
        </ResponsiveContainer>
      </div>
    );
  },
});
