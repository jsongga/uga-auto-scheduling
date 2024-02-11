import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { styled } from "@mui/joy";

export type Event = {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    description: string;
  };
};

const Build = (props: { events: Event[] }) => {
  useEffect(() => {
    console.log(props.events);
  }, [props.events]);

  return (
    <MyDiv>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        height={"100%"}
        events={props.events}
        slotDuration={"00:15:00"}
        // events={[
        //   {
        //     title: "event 1",
        //     start: "2024-02-06T10:30:00",
        //     end: "2024-02-06T13:30:00",
        //     extendedProps: { description: "This is a description" },
        //   },
        // ]}
        headerToolbar={false}
        scrollTime={"7:00:00"}
        eventContent={function (renderInfo) {
          return {
            html: `
                <b style="font-size: 1.1em;">${renderInfo.event.title}</b><br/>
                <i>${renderInfo.event.extendedProps.description}</i><br/>
                <i>${renderInfo.event.extendedProps.description2}</i>
                <i>${renderInfo.event.extendedProps.description3}</i>
              `,
          };
        }}
      />
    </MyDiv>
  );
};

const MyDiv = styled("div")`
  width: 100%;
  height: 80vh;
`;

export default Build;
