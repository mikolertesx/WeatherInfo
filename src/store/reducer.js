import { SET_LOCATION } from "./actionTypes";
import { setLocation } from "./actions";
import { createStore } from 'redux';

const initialState = {
  loc: {
    lat: null,
    long: null,
  }
}

function location(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {loc: action.loc};
    default:
      return state;
  }
}

const store = createStore(location);

const mapStateToProps = state => {
  return {
    location: state.loc
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLocationChange: newLocation => {
      dispatch(setLocation(newLocation));
    }
  }
}

export {store as LocationStore, mapStateToProps, mapDispatchToProps};