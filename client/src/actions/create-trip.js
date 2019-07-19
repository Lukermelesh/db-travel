import { createAction } from 'redux-actions';
import { post, put } from '../helpers/request-helpers';
import { flatten } from 'lodash';

export const CREATE_TRIP_REQUEST = 'createTrip/FETCH_REQUEST';
export const CREATE_TRIP_SUCCESS = 'createTrip/FETCH_SUCCESS';
export const CREATE_TRIP_FAILURE = 'createTrip/FETCH_FAILURE';

export const createTripRequest = createAction(CREATE_TRIP_REQUEST);
export const createTripSuccess = createAction(CREATE_TRIP_SUCCESS);
export const createTripFailure = createAction(CREATE_TRIP_FAILURE);

const ROOM = 0;
const TICKET = 1;

export const createTrip = (tripData, travellerDetails, isUpdating) => {
  return async dispatch => {
    let res;
    dispatch(createTripRequest());
    if (isUpdating) {
      await put('/trip', tripData);
    } else {
      res = await post('/trip', tripData);
      const tripId = res.data.id;
      await Promise.all(
        flatten(
          travellerDetails.map(async td => {
            let result = [];
            const userId = td.value;
            if (td.tickets.length) {
              await post('/ticket', {
                userId,
                tripId,
                fileUrl: td.tickets[0].url, //TODO: SUPPORT MULTIPLE FILES
                price: 1,
                type: TICKET
              });
            }
            if (td.accommodation.value) {
              await post('/ticket', {
                userId,
                tripId,
                roomId: td.accommodation.value,
                price: 1,
                type: ROOM
              });
              return result;
            }
          })
        )
      );
    }

    dispatch(createTripSuccess());
    return res;
  };
};
