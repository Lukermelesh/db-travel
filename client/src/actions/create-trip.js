import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';
import { flatten } from 'lodash';

export const CREATE_TRIP_REQUEST = 'createTrip/FETCH_REQUEST';
export const CREATE_TRIP_SUCCESS = 'createTrip/FETCH_SUCCESS';
export const CREATE_TRIP_FAILURE = 'createTrip/FETCH_FAILURE';

export const createTripRequest = createAction(CREATE_TRIP_REQUEST);
export const createTripSuccess = createAction(CREATE_TRIP_SUCCESS);
export const createTripFailure = createAction(CREATE_TRIP_FAILURE);

const ROOM = 0;
const TICKET = 1;

export const createTrip = (tripData, travellerDetails) => {
  return async dispatch => {
    dispatch(createTripRequest());
    try {
      const res = await post('/trip', tripData);
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
                })
            }
            if (td.accommodation.value) {
              await post('/ticket', {
                  userId,
                  tripId,
                  roomId: td.accommodation.value,
                  price: 0,
                  type: ROOM
                })
              return result;
            }
          })
        )
      );
      dispatch(createTripSuccess());
      return res;
    } catch (e) {
      console.log('ERROR ', e)
      dispatch(createTripFailure());
    }
  };
};
