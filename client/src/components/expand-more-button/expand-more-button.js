import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  rotatedIcon: {
    transform: 'rotate(180deg)'
  },
  iconButton: {
    padding: theme.spacing.unit
  },
  icon: {
    transition: 'transform 200ms'
  }
});

const ExpandMoreButton = ({ onClick, isOpen, classes }) => {
  return (
    <IconButton
      classes={{ root: classes.iconButton }}
      className={classnames(classes.icon, isOpen ? classes.rotatedIcon : '')}
      aria-expanded={isOpen}
      aria-label="Show more"
      onClick={onClick}
    >
      <ExpandMore />
    </IconButton>
  );
};

ExpandMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ExpandMoreButton);
