
import Helmet from 'react-helmet';
import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet
          title="Welcome"
          titleTemplate="%s | PianoShelf - free piano sheet music"
          meta={[
            { name: 'description', content: 'PianoShelf' },
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}
