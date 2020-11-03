import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel} from '@material-ui/core/';
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

export default function CreateEvent(props) {
  const { id } = useParams()
  const location = useLocation();
  const history = useHistory();
  const [eventName, setEventName] = useState("")
  const [rating, setRating] = useState("")
  const [eventStartDate, setEventStartDate] = useState("")
  const [eventEndDate, setEventEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [coverPhoto, setCoverPhoto] = useState("")


  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`http://localhost:3000/events/${id}`, {
        trip_ref_id: id,
        event_name: eventName,
        start_date: eventStartDate,
        end_date: eventEndDate,
        description,
        cover_photo: coverPhoto,
        rating: parseInt(rating)
      });

      history.push('/');
      history.push(location.pathname);
      
    } catch (err) {
      console.error(err.message)
    }
  }


  return (
    <FormControl autoComplete="off" className={classes.container} noValidate>    
        <TextField
        id="eventName"
        name="event_name"
        label="Event Name"
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >

          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      
      <TextField
        id="eventStartDate"
        name="start_date"
        label="Start Date"
        type="text"
        value={eventStartDate}
        placeholder="2020-01-01"
        onChange={(e) => setEventStartDate(e.target.value)}
      />
         <TextField
        id="eventEndDate"
        name="end_date"
        label="End Date"
        type="text"
        value={eventEndDate}
        placeholder="2020-01-02"
        onChange={(e) => setEventEndDate(e.target.value)}
        />

        <TextField
        id="description"
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
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
            color="secondary"
            onClick={handleSubmit}>
            Create Event Entry
          </Button>

    </FormControl>
  );
}