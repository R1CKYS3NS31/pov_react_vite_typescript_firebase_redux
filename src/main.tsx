import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import AppLoadingScreen from "./ui/components/layout/AppLoadingScreen";
import { store, persistor } from "./service/redux/store";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<AppLoadingScreen />} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>,
  );
}
