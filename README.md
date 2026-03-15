# KafkaGuide v1.0 — Developer Learning Portal

A comprehensive, static documentation site for learning Apache Kafka — from core concepts to production-grade patterns.

## Overview

KafkaGuide is a self-contained developer portal built with pure HTML, CSS, and vanilla JavaScript. It covers Kafka fundamentals, architecture internals, security, performance tuning, operations, and interview preparation — all searchable and navigable without a backend or build step.

## Features

- **Search** — Cmd+K / Ctrl+K opens a search modal with 60+ indexed sections
- **Dark/Light Theme** — toggleable, persisted via localStorage
- **Responsive Layout** — sidebar collapses to a hamburger menu on mobile
- **Keyboard Navigation** — arrow keys + Enter to navigate search results
- **No Build Step** — open any `.html` file directly in a browser or serve statically

## Content

| Page | Description |
|---|---|
| `index.html` | Introduction to Kafka and event streaming |
| `architecture.html` | Brokers, partitions, replication, KRaft vs ZooKeeper |
| `advanced.html` | EOS, log compaction, Kafka Streams, Schema Registry, Connect |
| `security.html` | TLS, SASL, ACLs, network isolation, audit logging |
| `performance.html` | Producer/consumer/broker tuning, compression, JVM settings |
| `usecases.html` | Event sourcing, CDC, microservices, real-time analytics |
| `operations.html` | Monitoring, consumer lag, scaling, rebalancing |
| `comparison.html` | Kafka vs RabbitMQ, Pulsar, Kinesis, Redis Streams |
| `cheatsheet.html` | CLI commands and configuration quick reference |
| `interview.html` | Common interview questions and concepts |
| `roadmap.html` | Learning path from beginner to expert |

## Getting Started

No installation required. Serve the directory with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# Go
go run golang.org/x/tools/cmd/godoc@latest -http=:8080
```

Then open `http://localhost:8080` in your browser.

Alternatively, open `index.html` directly in a browser — most features work without a server.

## Project Structure

```
kafka-learning-guide/
├── index.html
├── architecture.html
├── advanced.html
├── security.html
├── performance.html
├── operations.html
├── cheatsheet.html
├── interview.html
├── usecases.html
├── comparison.html
├── roadmap.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── search-data.js
└── favicon.svg
```

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Outfit, DM Mono)
- No frameworks, no dependencies, no build tooling

## License

MIT
