import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { Remote } from './pages/remote/remote';
import { About } from './pages/about/about';
import { HowTo } from './pages/how-to';
import { Devices } from './pages/devices';
import { Discovery } from './pages/discovery';
import { Pairing } from './pages/pairing';
import { Menu } from './components';
import { TvInfoProvider, TvInfoContext, TvInfoContextType } from './context';

setupIonicReact({
  swipeBackEnabled: false,
});

const DefaultRedirect: React.FC = () => {
  const { activeDevice } = useContext(TvInfoContext) as TvInfoContextType;
  return <Redirect to={activeDevice ? '/remote' : '/discovery'} />;
};

const App: React.FC = () => {
  return (
    <IonApp>
      <TvInfoProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route exact path="/remote">
                <Remote />
              </Route>
              <Route exact path="/devices">
                <Devices />
              </Route>
              <Route exact path="/discovery">
                <Discovery />
              </Route>
              <Route exact path="/pairing/:host">
                <Pairing />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/how-to">
                <HowTo />
              </Route>
              <Route exact path="/">
                <DefaultRedirect />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </TvInfoProvider>
    </IonApp>
  );
};

export default App;
