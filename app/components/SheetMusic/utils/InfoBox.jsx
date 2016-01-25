
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function InfoBox({ children, className, icon, title }) {
  return (
    <div className="sheetmusic__details-info-box">
      <div className="sheetmusic__details-info-box-title">
        <If condition={icon}>
          <FontAwesome name={icon} className="sheetmusic__details-info-box-icon" />
        </If>
        {title}
      </div>
      <div className={classNames('sheetmusic__details-info-box-content', className)}>
        {children}
      </div>
    </div>
  );
}

InfoBox.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  icon: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};
