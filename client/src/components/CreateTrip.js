import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CreateTrip() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
        <TextField
        id="tripName"
        name="trip_name"
        label="Trip Name"
        />
      
      <TextField
        id="tripStartDate"
        name="start_date"
        label="Start Date"
        type="date"
        defaultValue="2020-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
         <TextField
        id="tripEndDate"
        name="end_date"
        label="End Date"
        type="date"
        defaultValue="2020-01-02"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        />

        <TextField
        id="description"
        name="description"
        label="Description"
        multiline
        />

        <Button 
          variant="contained"
          component="label"
          >

            Upload Cover Photo
            <input type="file" style={{display:'none'}}/>
          </Button>

    </form>
  );
}