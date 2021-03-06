import React from 'react';
import PropTypes from 'prop-types';
// import Cookies from 'js-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import { reduxStore } from './index';
import { Auth, RoomLauncher, Room, Game } from './components';

const ROUTES = [
    { path: '/auth', key: 'AUTH', exact: true, component: Auth },
    {
        path: '/',
        key: 'APP',
        component: props => {
            const { user } = reduxStore.getState();
            if (!user.loggedIn) {
                // eslint-disable-next-line react/prop-types
                return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
            }
            return <RenderRoutes {...props} />;
        },
        routes: [
            {
                path: '/',
                key: 'APP_ROOT',
                exact: true,
                component: RoomLauncher
            },
            {
                path: '/room',
                key: 'APP_ROOM',
                exact: true,
                component: Room
            },
            {
                path: '/game',
                key: 'APP_GAME',
                exact: true,
                component: Game
            }
        ]
    }
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 */
const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
};

/**
 * Use this component for any new section of routes (any config object that has a "routes" property)
 */
export const RenderRoutes = ({ routes }) => {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
};

RenderRoutes.propTypes = {
    routes: PropTypes.array.isRequired
};