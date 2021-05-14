import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import rdvService from "services/rdvService";
import { Link ,useHistory } from "react-router-dom";
var locale = window.navigator.userLanguage || window.navigator.language;

moment.locale(locale);
const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])

const rdvList = () => {
  const [eventss, seteventss] = useState([]);
  const [events, setevents] = useState([]);
  const [date, setDate] = useState(new Date());
  const history = useHistory();


  useEffect(() => {
    retrievEvents();
    
  }, []);
  const   handleOnclickEvent = (event) => {

    console.log(event)
    history.push(`rdv/${event.id}`);
  }

  
  const retrievEvents = () => {
   rdvService.getAll()
      .then(response => {
        seteventss(response.data);
        var list=[]
        response.data.forEach(function (arrayItem) {
          list.push({
              'title':"Appointment-Name : "+ arrayItem.name +" |   Appointment-Note : " +arrayItem.note +" |   Candidate-Name :  " +arrayItem.candidateName,
              'start':arrayItem.rdvDate,
              'end': arrayItem.rdvDate,
              desc: arrayItem.note,
              id:arrayItem._id
              
          })
         
     });
     setevents(list)
        console.log(response.data)
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  return(
  <div >
     
    <BigCalendar
      dayChosen= {new Date()}
      events={events}
      step={60}
      views={allViews}
      onSelectEvent={(event)=>handleOnclickEvent(event)}
      defaultDate={new Date(date.getFullYear(),date.getMonth(),date.getDay())}
      style={{ height: 500,width: '95%' }}
    />
  </div>
)}

export default rdvList;