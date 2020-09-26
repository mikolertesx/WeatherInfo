import React from "react";
import {
  LocationStore,
} from "./store/reducer";

import {Provider} from 'react-redux';
import HereCard from "./components/HereCard";

function App() {
  return (
    <div className="App">
      <Provider store={LocationStore}>
      <HereCard />
      </Provider>
    </div>
  );
}
// default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;