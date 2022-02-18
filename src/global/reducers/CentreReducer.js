import { CENTRE_CHANGE, CENTRE_DETAIL } from '../constants';

const initialState = {
  data: null,
  detail: null,
};
const centreReducer = (state = initialState, action) => {
  switch (action.type) {
    case CENTRE_CHANGE:
      return {
        ...state,
        data: action.payload,
      };
    case CENTRE_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};
export default centreReducer;
