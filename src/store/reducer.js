import { SET_LOCATION, SET_DATE } from "./actionTypes";
import { setLocation, setDate } from "./actions";
import { createStore } from 'redux';

const initialState = {
  loc: {
    lat: null,
    long: null,
  },
  date: new Date(),
}

function location(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, loc: action.loc};
    case SET_DATE:
      return {...state, date: action.date};
    default:
      return state;
  }
}

const store = createStore(location);

const mapStateToProps = state => {
  return {
    location: state.loc,
    date: `${state.date.getDate()}/${state.date.getMonth()+1}/${state.date.getFullYear()}`,
    //state.date.toTimeString()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLocationChange: newLocation => {
      dispatch(setLocation(newLocation));
    },
    onDateChange: newDate => {
      dispatch(setDate(newDate));
    }
  }
}

export {store as LocationStore, mapStateToProps, mapDispatchToProps};