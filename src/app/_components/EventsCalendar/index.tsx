'use client';
import React, { useMemo } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';

import { Gutter } from '../../_components/Gutter';

import classes from './index.module.scss';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
moment.locale('en-US'); // or globalizeLocalizer

export type Props = {
  events: any[];
};

export const EventsCalander: React.FC<Props> = ({ events }) => {
  return (
    <Gutter className={classes.eventsCalendarWrapper}>
      <div className={classes.eventsCalendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
          }}
          initialView="dayGridMonth"
          events={events}
          displayEventTime={false}
          eventBackgroundColor="gray"
          eventBorderColor="gray"
          buttonIcons={false}
          themeSystem="standard"
          // eventContent={function (arg) {
          //   return (
          //     <div className={classes.eventContent}>
          //       <div className={classes.eventTitle}>{arg.event.title}</div>
          //       <div className={classes.eventDate}>
          //         {moment(arg.event.start).format('MMMM Do YYYY')}
          //       </div>
          //     </div>
          //   )
          // }}
        />
      </div>
    </Gutter>
  );
};
