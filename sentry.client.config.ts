import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6e113e42f93c87afb8af7003248ae2b1@o4509356137578496.ingest.de.sentry.io/4509733544984656",

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
