import React from 'react';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import ROUTES, { RenderRoutes } from './routes';
import { Nav } from './components';
import background from './assets/images/background.jpg';

export default class App extends React.Component {
    render() {
        return (
            <UWPThemeProvider
                theme={getTheme({
                    themeName: 'dark', // set custom theme
                    accent: '#0078D7', // set accent color
                    useFluentDesign: true, // sure you want use new fluent design.
                    desktopBackgroundImage: background // set global desktop background image
                })}
            >
                <div className="App">
                    <Router>
                        <Nav className="vh-5"/>
                        <Container fluid="true" className="vh-90">
                            <RenderRoutes routes={ROUTES} />
                        </Container>
                    </Router>
                </div>
            </UWPThemeProvider>
        );
    }
}