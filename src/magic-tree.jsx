import React, { createContext, Component } from 'react';
import { connect } from 'react-redux';

export const createMagicTree = (
  mapStateToProps = null,
  mapDispatchToProps = null
) => (domain = '') => {
  const Context = createContext();
  const { Consumer, Provider } = Context;

  const withContext = Component => {
    return function WrapperComponent(props) {
      return (
        <Consumer>
          {context => {
            return <Component {...context} {...props} />;
          }}
        </Consumer>
      );
    };
  };

  class innerContainer extends Component {
    render() {
      const { children, restProps } = this.props;

      return <Provider value={{ ...restProps }}>{children}</Provider>;
    }
  }

  const hocName = `with${domain}Context`;
  const containerName = `${domain}Container`;

  const Container = connect(
    mapStateToProps,
    mapDispatchToProps
  )(innerContainer);

  return {
    [hocName]: withContext,
    [containerName]: Container
  };
};
