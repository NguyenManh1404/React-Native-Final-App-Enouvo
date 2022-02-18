import { CENTRE_CHANGE, CENTRE_DETAIL } from '../constants';

function changeData(data) {
  return {
    type: CENTRE_CHANGE,
    payload: data,
  };
}
function changeDetail(detailCentreData) {
  return {
    type: CENTRE_DETAIL,
    payload: detailCentreData,
  };
}
export { changeData, changeDetail };
