import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import styles from './trip-card.module.css';
import classnames from 'classnames';
import * as tripStatus from '../../constants/trip-status';
import { timestampToDate } from '../../helpers/date-helpers';

const TripCard = ({ trip }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  //TODO: maybe think about using redux?
  //TODO: finish wiring
  const handleApproveClick = () => alert('approved');
  const handleDeclineClick = () => alert('declined');
  const handleEdit = () => alert('edit');

  const getCardTitle = () => {
    const status = trip.details.status;
    switch (status) {
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

  const isPending = trip.details.status === tripStatus.PENDING;

  /*TODO: change color depending on trip status*/
  return (
    <Card className={styles.root}>
      <CardHeader title={getCardTitle()} className={styles.header} />
      <CardContent>
        <Typography component="p">
          From: {timestampToDate(trip.from)}
        </Typography>
        <Typography component="p">To: {timestampToDate(trip.to)}</Typography>
        <Typography component="p">Destination: {trip.destination}</Typography>
      </CardContent>
      <CardActions
        className={classnames(styles.flex, !isPending && styles.justifyRight)}
        disableActionSpacing
      >
        {isPending && (
          <div className={styles.flex}>
            <div className={styles.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApproveClick}
                aria-label="Approve"
              >
                Approve
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                className={styles.button}
                onClick={handleDeclineClick}
                aria-label="Decline"
              >
                Decline
              </Button>
            </div>
          </div>
        )}
        <div>
          <IconButton onClick={handleEdit} aria-label="Edit">
            <Edit />
          </IconButton>
          <IconButton
            className={expanded ? styles.rotatedIcon : ''}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component="p">Department: {trip.department}</Typography>
          {/*TODO: tickets should be a file/multiple files*/}
          <Typography component="p">Tickets: {trip.details.tickets}</Typography>
          {/*TODO: decide how to display apartments*/}
          <Typography component="p">
            Accommodation: {trip.details.apartments}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripCard;
