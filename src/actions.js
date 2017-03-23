import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import { API_ENDPOINT } from './config';

const fetchItemsStart = createAction(types.FETCH_ITEMS_START);
const fetchItemsSuccess = createAction(types.FETCH_ITEMS_SUCCESS);
const fetchItemsError = createAction(types.FETCH_ITEMS_ERROR);

/**
 * return the API data in a simplified format like [{id, preview}, {id, preview}, ...]
 * @param APIData
 * @returns {id, preview}
 */
const filterItems = (APIData) => {
  return APIData.map(item => {
    const id = item.data.id;
    const preview = item.data.preview.images[0].source.url;
    return {
      id, preview
    }
  });
};

export function fetchItems() {
  return (dispatch) => {
    fetch(API_ENDPOINT).then(rawResp => rawResp.json()).then(resp => {
      if (!(resp && resp.data && resp.data.children)) {
        return fetchItemsError(new Error('Unexpected API response!'));
      }

      dispatch(fetchItemsSuccess(
        filterItems(resp.data.children)
      ));
    });

    dispatch(fetchItemsStart());
  };
}
