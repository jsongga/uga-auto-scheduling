import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import { styled } from '@mui/joy'

const Build = () => {
    
    return (
      <MyDiv>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
          initialView="timeGridWeek"
          weekends={false}
          height={500}
          events={[
            { 
              title: 'event 1', 
              start: '2024-02-06T10:30:00', 
              end: '2024-02-06T13:30:00',
              extendedProps: {description: "This is a description"}
            },
          ]}
          headerToolbar = {{
            start: "prev,next",
            center: 'title',
            end: ""
          }}
          eventContent={function(renderInfo) {
            return {
              html: `
                <b>${renderInfo.event.title}</b><br/>
                <i>${renderInfo.event.extendedProps.description}</i>
              `
            };
          }}
        />
      </MyDiv>
    )
  }

  const MyDiv = styled('div')`
    width: 50%;
    height: 50%;
    `

export default Build