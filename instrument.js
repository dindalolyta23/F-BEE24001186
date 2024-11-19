// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
    enabled: true,
    dsn: "https://40623254ed96c18945eb23291ac05cb4@o4508319582453760.ingest.us.sentry.io/4508319590055936",
    integrations: [    
      nodeProfilingIntegration(),
    ],
    environment: "development",
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });