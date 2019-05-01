import React, {useState} from 'react';
import styles from './trip-card.module.css';
import {Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography} from '@material-ui/core';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as tripStatus from '../../constants/trip-status';

const TripCard = ({trip}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

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

  return (
    <div>
      <Card className={styles.root}>
        <CardHeader title={getCardTitle()} className={styles.header}/>
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions className={styles.actions} disableActionSpacing>
          <IconButton
            className={classnames(styles.expand, {
              [styles.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default TripCard;