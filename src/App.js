import React from "react";
import {
  LocationStore,
} from "./store/reducer";

import {Provider} from 'react-redux';

import WeatherCard from './components/WeatherCard';

function App() {
  return (
    <div className="App">
      <Provider store={LocationStore}>
      <WeatherCard />
      </Provider>
    </div>
  );
}
// default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;