import React, { Fragment, useState } from 'react';
import { flow } from 'lodash';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/Edit';
import FlightIcon from '@material-ui/icons/Flight';
import HotelIcon from '@material-ui/icons/Hotel';
import classnames from 'classnames';
import * as tripStatus from '../../constants/trip-status';
import { timestampToDate } from '../../helpers/date-helpers';
import { connect } from 'react-redux';
import { approveTrip } from '../../actions/approve-trip';
import { rejectTrip } from '../../actions/reject-trip';
import { getUserType } from '../../selectors/user-data';
import { ADMIN, ORGANIZER } from '../../constants/user-types';
import { ExpandMoreButton } from '../expand-more-button';
import Links from '../links/links';
import { EDIT_TRIP_ROUTE } from '../../constants/routes';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';

const styles = theme => ({
  primaryCta: {
    marginRight: theme.spacing.unit
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  justifyRight: {
    justifyContent: 'flex-end'
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  iconColorPrimary: {
    color: 'limegreen'
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const TripCard = ({
  trip,
  classes,
  approveTrip,
  rejectTrip,
  isPrivilegedUser,
  showActions,
  isMerging,
  onTripSelect
}) => {
  const [expanded, setExpanded] = useState(false);

  const isSingleTraveller = trip && trip.travelDetails && trip.travelDetails.length === 1;
  const handleExpandClick = () => setExpanded(!expanded);
  const getHeaderColor = () => {
    switch (getTripStatus()) {
      case tripStatus.APPROVED:
        return 'lightskyblue';
      case tripStatus.COMPLETED:
        return 'seagreen';
      case tripStatus.REJECTED:
        return 'tomato';
      case tripStatus.PENDING:
        return 'gold';
      default:
        return 'silver';
    }
  };

  const handleApproveClick = () => approveTrip(trip.id);
  const handleDeclineClick = () => rejectTrip(trip.id);

  const handleOnChange = ev => {
    if (ev.target.checked) {
      onTripSelect(trip.id);
    }
  };

  const getCardHeader = () => (
    <Fragment>
      <Typography variant="h6">{getCardTitle()}</Typography>
      {isMerging && <Checkbox onChange={handleOnChange} />}
    </Fragment>
  );

  const getCardTitle = () => {
    switch (getTripStatus()) {
      case tripStatus.APPROVED:
        return 'Approved';
      case tripStatus.COMPLETED:
        return 'Trip completed';
      case tripStatus.REJECTED:
        return 'Trip rejected';
      case tripStatus.PENDING:
        return 'Pending approval';
      default:
        return 'Status unknown';
    }
  };

  const travelDetails = trip && trip.travelDetails && trip.travelDetails[0];
  const isPending = trip.details.status === tripStatus.PENDING;

  const hasTripStarted = trip => trip.from <= Date.now();

  const getTravelDetailsByUserId = id =>
    trip.travelDetails.find(td => td.userId === id);

  const renderTravellers = () =>
    trip.travelers ? trip.travelers.map(traveller => {
      const { id, name } = traveller;
      const { tickets, accommodation } = getTravelDetailsByUserId(id);
      const iconColorOverride = { colorPrimary: classes.iconColorPrimary };
      return (
        <div key={id} className={classes.flex}>
          <Typography component="p">{name}</Typography>
          <div className={classes.icons}>
            <FlightIcon
              classes={iconColorOverride}
              color={tickets && tickets.length ? 'primary' : 'error'}
            />
            <HotelIcon
              classes={iconColorOverride}
              color={
                accommodation && accommodation.fileUrl ? 'primary' : 'error'
              }
            />
          </div>
        </div>
      );
    }) : (
        <div className={classes.flex}>
          <div className={classes.icons}>
            <FlightIcon
              classes={{ colorPrimary: classes.iconColorPrimary }}
              color={trip.details.tickets && trip.details.tickets.length ? 'primary' : 'error'}
            />
            <HotelIcon
              classes={{ colorPrimary: classes.iconColorPrimary }}
              color={
                trip.details.accommodation && trip.details.accommodation.fileUrl ? 'primary' : 'error'
              }
            />
          </div>
        </div>
      );

  const getTripStatus = () => {
    const status = trip && trip.details && trip.details.status;
    if (typeof status !== 'number') {
      return 1;
    } else {
      return status
    }
  }

  const renderTravellerDetails = (travellerDetails, travellerName) => {
    const { value: userId, tickets, accommodation } = travellerDetails;
    return (
      <div key={userId} className={classes.nested}>
        <Divider className={classes.divider} />
        <Typography variant="h5" component="p">
          {travellerName}
        </Typography>
        <Typography variant="h6" component="p">
          Tickets
        </Typography>
        <Links
          links={tickets.map(t => ({ url: t.fileUrl, title: t.fileUrl }))}
        />
        {accommodation && (
          <Fragment>
            <Typography variant="h6" component="p">
              Accommodation
            </Typography>
            <Typography component="p">{accommodation.roomName}</Typography>
            {accommodation.files && (
              <Fragment>
                <Divider className={classes.divider} />
                <Typography variant="h6" component="p">
                  Reservation
                </Typography>
                <Links allowDelete links={accommodation.files} />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  };

  const acc = (travelDetails && travelDetails.accommodation) || {};
  return (
    <Card>
      <CardHeader
        title={getCardHeader()}
        style={{
          backgroundColor: getHeaderColor()
        }}
      />
      <CardContent>
        <Typography variant="h6" component="p">
          Travellers
        </Typography>
        {renderTravellers()}
        <Divider className={classes.divider} />
        <Typography variant="h6" component="p">
          Time
        </Typography>
        <Typography component="p">{`${timestampToDate(
          trip.from
        )} - ${timestampToDate(trip.to)}`}</Typography>
        <Divider className={classes.divider} />
        <Typography variant="h6" component="p">
          Location
        </Typography>
        <Typography component="p">{`${trip.origin} - ${
          trip.destination
        }`}</Typography>
      </CardContent>
      <CardActions
        className={classnames(classes.flex, !isPending && classes.justifyRight)}
        disableActionSpacing
      >
        {(showActions && !hasTripStarted(trip) && (
          <div className={classes.flex}>
            <div className={classes.primaryCta}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApproveClick}
                aria-label="Approve"
              >
                Approve
              </Button>
            </div>
            <div>
              <Button onClick={handleDeclineClick} aria-label="Decline">
                Decline
              </Button>
            </div>
          </div>
        )) || <div />}
        <div>
          {isPrivilegedUser && !hasTripStarted(trip) && (
            <Link to={`${EDIT_TRIP_ROUTE}/${trip.id}`} component="p">
              <IconButton
                classes={{ root: classes.iconButton }}
                aria-label="Edit"
              >
                <Edit />
              </IconButton>
            </Link>
          )}
          <ExpandMoreButton isOpen={expanded} onClick={handleExpandClick} />
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {trip.travelers ? trip.travelers.map(t =>
            renderTravellerDetails(
              trip.travelDetails.find(td => td.userId === t.id),
              t.name
            )) : renderTravellerDetails(trip.details, '')

          }
        </CardContent>
      </Collapse>
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  approveTrip: PropTypes.func.isRequired,
  rejectTrip: PropTypes.func.isRequired,
  isPrivilegedUser: PropTypes.bool.isRequired,
  showActions: PropTypes.bool,
  isMerging: PropTypes.bool,
  onTripSelect: PropTypes.func
};

const mapStateToProps = state => {
  const userType = getUserType(state);
  return {
    isPrivilegedUser: userType === ORGANIZER || userType === ADMIN
  };
};

const mapDispatchToProps = {
  approveTrip,
  rejectTrip
};

export default flow(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(TripCard);
