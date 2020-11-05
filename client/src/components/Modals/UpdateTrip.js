import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Checkbox, FormControl, FormControlLabel } from '@material-ui/core/'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

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

export default function CreateTrip(props) {
  const user_id = props.user;
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [trip, setTrip] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [coverPhoto, setCoverPhoto] = useState("")
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.put(`http://localhost:3000/events/${id}`, {
        user_id,
        trip_name: trip,
        start_date: startDate,
        end_date: endDate,
        description,
        is_public: isPublic,
        cover_photo: coverPhoto
      });

      history.push('/');
      history.push(location.pathname);
      
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleChange = () => {
    setIsPublic(!isPublic);
  }

  return (
    <FormControl autoComplete="off" className={classes.container} noValidate>
        <TextField
        id="tripName"
        name="trip_name"
        label="Trip Name"
        value={trip}
        onChange={(e) => setTrip(e.target.value)}
        />
      
      <TextField
        id="tripStartDate"
        name="start_date"
        label="Start Date"
        type="text"
        value={startDate}
        placeholder="2020-01-01"
        onChange={(e) => setStartDate(e.target.value)}
      />
         <TextField
        id="tripEndDate"
        name="end_date"
        label="End Date"
        type="text"
        value={endDate}
        placeholder="2020-01-02"
        onChange={(e) => setEndDate(e.target.value)}
        />

        <TextField
        id="description"
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        />
        <FormControlLabel 
          control={
              <Checkbox 
                checked={isPublic} 
                name="isPublic"
                color="primary"
                value={isPublic}
                onChange={handleChange} 
                />
          }
              label="Make trip public?"
        />

        <Button 
          variant="contained"
          component="label"
          >

            Upload Cover Photo
              <input 
                type="file" 
                style={{display:'none'}}
                onChange={(e) => setCoverPhoto(e.target.value)}
                value={coverPhoto}/>
          </Button>

          <Button 
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            color="secondary">
            Update Trip Entry
          </Button>

    </FormControl>
  );
}