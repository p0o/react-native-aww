import * as types from './actionTypes';

const initialState = {
  items: [],
  itemsById: {},
  interactions: [],
  fetching: false,
};

const itemsByIdReducer = (state, action) => {
  switch(action.type) {
    case types.FETCH_ITEMS_SUCCESS:
      const listById = {};
      action.payload.forEach(item => { listById[item.id] = item });

      return {
        ...state,
        ...listById,
      };
    default:
      return state;
  }
};

const itemReducer = (state, action) => {
  switch(action.type) {
    case types.FETCH_ITEMS_SUCCESS:
      return [
        ...state,
        ...action.payload.map(item => item.id),
      ];
    default:
      return state;
  }
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS_START:
      return {
        ...state,
        fetching: true,
      };
    case types.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: itemReducer(state.items, action),
        itemsById: itemsByIdReducer(state.itemsById, action),
        fetching: false,
      };
    case types.FETCH_ITEMS_ERROR:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default reducers;
