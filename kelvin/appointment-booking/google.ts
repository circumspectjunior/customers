import { GaxiosResponse } from "gaxios";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3, google } from "googleapis";

const oAuth2Client = new OAuth2Client("427680906061-httjf3075qlepdbu570eil7rf8ea8oc1.apps.googleusercontent.com",// YOUR_CLIENT_ID" 
"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", // YOUR_CLIENT_SECRET
"http://localhost:5173"// YOUR_REDIRECT_URI
)
oAuth2Client.setCredentials({
  refresh_token: "YOUR_REFRESH_TOKEN",
});

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});

interface EventAttendee {
  email: string;
}

interface EventReminderOverride {
  method: string;
  minutes: number;
}

interface EventReminders {
  useDefault: boolean;
  overrides: EventReminderOverride[];
}

interface EventDateTime {
  dateTime: string;
  timeZone: string;
}

interface CalendarEvent {
  summary: string;
  location: string;
  description: string;
  start: EventDateTime;
  end: EventDateTime;
  attendees: EventAttendee[];
  reminders: EventReminders;
}

const event: CalendarEvent = {
  summary: "Appointment Booking",
  location: "Online",
  description: "Appointment with client",
  start: {
    dateTime: "2025-01-02T10:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: "2025-01-02T11:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  attendees: [{ email: "client@example.com" }],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 }, // 1 day before
      { method: "popup", minutes: 10 }, // 10 minutes before
    ],
  },
};

calendar.events.insert(
  { calendarId: "primary", requestBody: event },
  (err: Error | null, res: GaxiosResponse<calendar_v3.Schema$Event> | null | undefined) => {
    if (err) {
      console.log("There was an error contacting the Calendar service: " + err);
      return;
    }
    if (res && res.data) {
      console.log("Event created: %s", res.data.htmlLink);
    }
  }
);
