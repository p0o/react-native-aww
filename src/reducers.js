import * as types from './actionTypes';

const initialState = {
  items: [],
  itemsById: {},
  interactions: {},
  fetching: false,
};

const interactionsReducer = (state = [], action) => {
  switch (action.type) {
    case types.LIKE_ITEM:
      return {
        ...state,
        [action.payload]: { liked: true },
      };
    case types.DISLIKE_ITEM:
      return {
        ...state,
        [action.payload]: { liked: false },
      };
    default:
      return state;
  }
};

const itemsByIdReducer = (state, action) => {
  switch (action.type) {
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
  switch (action.type) {
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
    case types.LIKE_ITEM:
    case types.DISLIKE_ITEM:
      return {
        ...state,
        interactions: interactionsReducer(state.interactions, action),
      };
    default:
      return state;
  }
};

export default reducers;
