import * as types from './actionTypes';

const initialState = {
  items: [],
  itemsById: {},
  interactions: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      return {
        ...state,
        items: itemReducer(state.items, action),
        itemsById: itemsByIdReducer(state.itemsById, action),
      };
    return state;
  }
};

export default reducers;
