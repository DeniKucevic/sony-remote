import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Remote } from "./pages/remote/remote";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { About } from "./pages/about/about";
import { Menu } from "./components";
import { TvInfoProvider } from "./context";
import { HowTo } from "./pages/how-to";

setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => (
  <IonApp>
    <TvInfoProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route exact path="/remote">
              <Remote />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/how-to">
              <HowTo />
            </Route>
            <Route exact path="/">
              <Redirect to="/remote" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </TvInfoProvider>
  </IonApp>
);

export default App;
