import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';
import getDevRouters from '../../customApp/router';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../Todo'))}
        />
        {getDevRouters(url)}
      </Switch>
    );
  }
}

export default AppRouter;
