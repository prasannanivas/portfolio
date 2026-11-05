---
title: AI writes 90% of my code. Here's the 10% it can't.
date: 2026-11-05
excerpt: Most of my keystrokes are AI-generated now. The parts that decide whether a system works still aren't.
tags: [AI, Engineering, Career]
draft: true
---

Let's get the honest number out of the way: on most days, about **90% of the code I ship started as an AI suggestion**.

That sounds like the end of the job. In practice it moved the job.

## The keystrokes got cheap. The decisions didn't.

When typing code was slow, a lot of engineering time disappeared into syntax, boilerplate and looking things up. AI took most of that away. What's left is the part that was always the real work:

- **Where do the boundaries go?** Which service owns what, and what happens under load.
- **What shape should the data be?** Not the textbook shape — the one that matches how it's actually read.
- **What does the business actually need?** Who uses this, what they're afraid of, what would embarrass them.
- **What breaks if we're wrong?** And who gets paged when it does.

AI is very good at answering the question you asked. It is much less good at noticing you asked the wrong one.

## Three times I said no

**Bond-yield storage.** For my trading monitor, the obvious design was one MongoDB document per daily data point. I went with one document per country + maturity, with the history kept as an array, because every read wants a whole series at once. That took the collection from **125,000+ documents to 18**.

**Where heavy queries live.** The auth service already had a database connection, so it was the convenient place to serve history and backtests. I moved those reads next to the engine scanning 1,214 symbols instead, and kept auth tiny — so logins stay fast even mid-scan.

**Numbers in front of clients.** On Boomsold, a real-estate map for a Montréal broker, the default was to show a median price for every neighbourhood. I hid any median built on fewer than 30 sales. Fewer numbers on screen — but none a client could catch out.

## How I actually work now

1. Decide the shape of the system first: boundaries, data, failure modes.
2. Let AI write the first draft of the code, fast.
3. Read every line like a reviewer, not an author.
4. Own it when it breaks.

AI made me faster. Judgment is still what makes it right.
