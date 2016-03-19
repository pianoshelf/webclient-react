
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

// Import other components
import Footer from '../Fixtures/Footer';
import NavBar from '../Fixtures/NavBar';
import ResponsiveContainer from '../Misc/ResponsiveContainer';
import { getUploadsForUser } from '../../actions/profile';
import { getShelf } from '../../actions/shelf';

@asyncConnect({
  promise: (params, { store, request }) => {
    const user = store.getState().login.user.username;
    return Promise.all([
      store.dispatch(getShelf(user, request)),
      store.dispatch(getUploadsForUser(user, 1, request)),
    ]);
  },
})
@connect(
  state => ({
    shelf: state.profile.shelf,
    uploads: state.profile.uploads,
  }),
)
export default class Dashboard extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderMyShelf() {
    console.log('shelf');
    console.log(this.props.shelf);
    return (
      <div className="dashboard__list">
        <div className="dashboard__list-title">
          My Shelf
        </div>
        <ul className="dashboard__list-container">

        </ul>
      </div>
    );
  }


  renderMySheetMusic() {
    console.log('uploads');
    console.log(this.props.uploads);
    return (
      <div className="dashboard__list">
        <div className="dashboard__list-title">
          My Sheet Music
        </div>
        <ul className="dashboard__list-container">
        </ul>
      </div>
    );
  }

  renderDashboard() {
    return (
      <div className="dashboard__wrapper">
        <div className="dashboard__wrapper-half dashboard__wrapper-half--left">
          {this.renderMyShelf()}
        </div>
        <div className="dashboard__wrapper-half">
          {this.renderMySheetMusic()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard">
        <NavBar />
        <ResponsiveContainer className="dashboard__container">
          {this.renderDashboard()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
