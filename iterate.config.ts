import { contextRulesFromFiles, defineConfig, matchers } from "@iterate-com/sdk";

const config = defineConfig({
  contextRules: [
    // You can use "matchers" to conditionally apply rules
    // For example to only be active when certain MCP connections are present
    {
      key: "how-we-use-linear",
      prompt: "Tag any new issues with the label `iterate-tutorial`",
      match: matchers.hasMCPConnection("linear"),
    },

    // Or when a certain user is on a thread
    {
      key: "jonas-rules",
      prompt: "When Jonas is on a thread, remind him to lock in",
      match: matchers.hasParticipant("jonas"),
    },

    // You can also use mathcers.and, matchers.or and matchers.not
    {
      key: "jonas-in-the-evening",
      prompt: "It's between 22:00 - 06:00, remind jonas to go to sleep",
      match: matchers.and(
        matchers.hasParticipant("jonas"),
        matchers.timeWindow({
          timeOfDay: { start: "22:00", end: "06:00" },
        }),
      ),
    },
    {
      key: "mineflare-faq-c09l4usqkn2",
      prompt: `
# Mineflare FAQ

**What is Mineflare?**
Mineflare provides managed Minecraft hosting tailored for community servers with automated scaling and modpack management.

**What are the support hours?**
Our support engineers monitor requests Monday–Friday, 08:00–20:00 UTC, with on-call escalation for critical incidents outside these hours.

**How do I report an outage?**
Post a message in this channel with the keyword "INCIDENT" and include the affected server ID; the on-call engineer is paged automatically.

**Where can I track maintenance and updates?**
Visit https://status.mineflare.io for live maintenance windows and subscribe for email/SMS notifications.

**Can I request custom modpacks?**
Yes. Upload the modpack manifest via the Mineflare dashboard and tag @support here for fast-tracking within 24 hours.
`,
      match: matchers.slackChannel("C09L4USQKN2"),
    },
    // This file is "just typescript", so you can do whatever you want
    // e.g. structure your rules in markdown, too, and use a helper to load them
    ...contextRulesFromFiles("rules/**/*.md"),
  ],
});
export default config;
