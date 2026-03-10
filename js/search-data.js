// Static search index — one entry per major section across all pages
window.SEARCH_INDEX = [
  // index.html
  { page: 'index.html', pageTitle: 'Home', section: 'What is Apache Kafka?', excerpt: 'Distributed event streaming platform for high-throughput, fault-tolerant, real-time data processing at any scale.' },
  { page: 'index.html', pageTitle: 'Home', section: 'Why Kafka Exists', excerpt: 'Point-to-point integration problem — N×(N-1)/2 connections. Kafka introduces a central event log to reduce complexity.' },
  { page: 'index.html', pageTitle: 'Home', section: 'Event Streaming', excerpt: 'Capture, store, process, and deliver streams of events in real-time using producers and consumers.' },
  { page: 'index.html', pageTitle: 'Home', section: 'Messaging vs Streaming', excerpt: 'Traditional messaging deletes after consumption. Kafka retains events for days/weeks with full replay capability.' },
  { page: 'index.html', pageTitle: 'Home', section: 'Who Uses Kafka?', excerpt: 'LinkedIn, Uber, Netflix, Goldman Sachs — 80% of Fortune 100 companies use Kafka in production.' },
  { page: 'index.html', pageTitle: 'Home', section: 'Quick Start', excerpt: 'Docker Compose setup for Kafka + ZooKeeper. Create topics, produce and consume messages via CLI.' },

  // architecture.html
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Brokers & Clusters', excerpt: 'A Kafka cluster is a group of broker servers. Each broker stores partitions and handles producer/consumer requests.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Topics & Partitions', excerpt: 'Topics are divided into partitions — ordered, append-only logs. Partitions are the unit of parallelism and replication.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Producers', excerpt: 'Producers write records to topics. Configure acks, retries, batching (linger.ms, batch.size) and compression.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Consumers & Consumer Groups', excerpt: 'Each partition is consumed by exactly one consumer per group. Max parallelism equals number of partitions.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Replication', excerpt: 'Each partition has one leader and N-1 followers. ISR (in-sync replicas) ensures data durability on failover.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'ZooKeeper vs KRaft', excerpt: 'KRaft (Kafka 3.x) eliminates ZooKeeper dependency. Metadata stored in an internal Raft-based log.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Log Storage', excerpt: 'Kafka uses sequential disk I/O and OS page cache. Segments are immutable files with configurable retention.' },
  { page: 'architecture.html', pageTitle: 'Architecture', section: 'Zero-Copy', excerpt: 'sendfile() syscall transfers data from disk to network socket without copying through user space. Key to Kafka speed.' },

  // advanced.html
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Delivery Semantics', excerpt: 'At-most-once (commit before process), at-least-once (commit after), exactly-once (idempotent + transactions).' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Exactly-Once Semantics (EOS)', excerpt: 'Idempotent producer with sequence numbers + transactions for atomic multi-partition writes. enable.idempotence=true.' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Log Compaction & Retention', excerpt: 'cleanup.policy=delete (time-based), compact (latest per key), or compact+delete. Used for CDC and event sourcing.' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Kafka Streams', excerpt: 'Client library for stream processing inside your JVM app. KStream, KTable, GlobalKTable, windowing, joins.' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Schema Registry', excerpt: 'Centralized schema management for Avro, Protobuf, JSON Schema. Enforces backward/forward/full compatibility.' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Kafka Connect', excerpt: 'Framework for source/sink connectors. Debezium CDC, JDBC, S3, Elasticsearch. Single Message Transforms (SMT).' },
  { page: 'advanced.html', pageTitle: 'Advanced Kafka', section: 'Partition Strategy & Ordering', excerpt: 'Key-based (hash), round-robin, sticky, or custom partitioner. Ordering guaranteed within a partition only.' },

  // security.html
  { page: 'security.html', pageTitle: 'Security', section: 'TLS Encryption', excerpt: 'Encrypt data in transit between clients and brokers. Configure ssl.keystore and ssl.truststore.' },
  { page: 'security.html', pageTitle: 'Security', section: 'SASL Authentication', excerpt: 'SASL/PLAIN, SASL/SCRAM-SHA-256, SASL/GSSAPI (Kerberos), SASL/OAUTHBEARER for client authentication.' },
  { page: 'security.html', pageTitle: 'Security', section: 'ACL Authorization', excerpt: 'Access Control Lists — grant Read/Write/Describe/Create permissions to principals on topics and consumer groups.' },
  { page: 'security.html', pageTitle: 'Security', section: 'Network Isolation', excerpt: 'Separate listeners for internal and external traffic. Use PLAINTEXT internally, SSL externally.' },
  { page: 'security.html', pageTitle: 'Security', section: 'Audit Logging', excerpt: 'Log all authentication events and ACL changes. Use authorizer.class.name for custom audit implementations.' },

  // performance.html
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'Producer Tuning', excerpt: 'Increase batch.size (64KB+), linger.ms (10-50ms), buffer.memory. Use compression.type=lz4 or zstd.' },
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'Consumer Tuning', excerpt: 'Increase fetch.min.bytes, fetch.max.wait.ms. Tune max.poll.records and session.timeout.ms.' },
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'Broker Tuning', excerpt: 'num.io.threads, num.network.threads, log.flush.interval. OS page cache is critical — maximize heap for cache.' },
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'Compression', excerpt: 'LZ4 for throughput, ZSTD for best compression ratio. Compress at producer, stored compressed, consumer decompresses.' },
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'JVM Settings', excerpt: 'Use G1GC, set -Xms and -Xmx equal (6-8GB), enable GC logging. Avoid large heaps to prevent GC pauses.' },
  { page: 'performance.html', pageTitle: 'Performance Tuning', section: 'Partitioning Strategy', excerpt: 'More partitions = more parallelism but more overhead. Rule of thumb: throughput-MB/s ÷ consumer throughput.' },

  // usecases.html
  { page: 'usecases.html', pageTitle: 'Use Cases', section: 'Event Sourcing', excerpt: 'Store every state change as an immutable event. Replay events to reconstruct state at any point in time.' },
  { page: 'usecases.html', pageTitle: 'Use Cases', section: 'Change Data Capture (CDC)', excerpt: 'Capture database changes with Debezium. Stream INSERT/UPDATE/DELETE events from PostgreSQL, MySQL to Kafka.' },
  { page: 'usecases.html', pageTitle: 'Use Cases', section: 'Microservices Messaging', excerpt: 'Decouple services with async messaging. Services publish events; subscribers react independently.' },
  { page: 'usecases.html', pageTitle: 'Use Cases', section: 'Real-Time Analytics', excerpt: 'Stream clickstream, metrics, or IoT data into Kafka. Process with Kafka Streams or ksqlDB, sink to ClickHouse.' },
  { page: 'usecases.html', pageTitle: 'Use Cases', section: 'Fraud Detection', excerpt: 'Join transaction streams with risk profiles in real-time. Alert on suspicious patterns using windowed aggregations.' },

  // comparison.html
  { page: 'comparison.html', pageTitle: 'Kafka vs Others', section: 'Kafka vs RabbitMQ', excerpt: 'Kafka retains messages; RabbitMQ deletes after consumption. Kafka: millions/sec. RabbitMQ: 50K/sec. Different use cases.' },
  { page: 'comparison.html', pageTitle: 'Kafka vs Others', section: 'Kafka vs Apache Pulsar', excerpt: 'Pulsar separates storage (BookKeeper) from serving. Supports multi-tenancy natively. Kafka simpler operationally.' },
  { page: 'comparison.html', pageTitle: 'Kafka vs Others', section: 'Kafka vs AWS Kinesis', excerpt: 'Kinesis: managed, 7-day retention max, 1MB/s per shard. Kafka: self-managed, unlimited retention, higher throughput.' },
  { page: 'comparison.html', pageTitle: 'Kafka vs Others', section: 'Kafka vs Redis Streams', excerpt: 'Redis Streams: in-memory, fast, limited retention. Kafka: disk-based, durable, production-grade streaming.' },

  // operations.html
  { page: 'operations.html', pageTitle: 'Operations', section: 'Monitoring', excerpt: 'Key metrics: consumer lag, under-replicated partitions, request latency, bytes in/out. Use JMX + Prometheus + Grafana.' },
  { page: 'operations.html', pageTitle: 'Operations', section: 'Consumer Lag', excerpt: 'Lag = latest offset - committed offset. Alert when lag grows continuously. kafka-consumer-groups.sh --describe.' },
  { page: 'operations.html', pageTitle: 'Operations', section: 'Topic Management', excerpt: 'Create, alter, describe, delete topics via kafka-topics.sh. Increase partitions but never decrease.' },
  { page: 'operations.html', pageTitle: 'Operations', section: 'Offset Management', excerpt: 'Reset offsets with kafka-consumer-groups.sh --reset-offsets. Use --dry-run first. Supports earliest/latest/specific.' },
  { page: 'operations.html', pageTitle: 'Operations', section: 'Rolling Upgrades', excerpt: 'Upgrade one broker at a time. Ensure ISR is healthy before continuing. Use inter.broker.protocol.version.' },

  // cheatsheet.html
  { page: 'cheatsheet.html', pageTitle: 'Cheatsheet', section: 'Topic Commands', excerpt: 'kafka-topics.sh --create --list --describe --delete --alter. Essential CLI reference.' },
  { page: 'cheatsheet.html', pageTitle: 'Cheatsheet', section: 'Producer & Consumer CLI', excerpt: 'kafka-console-producer.sh and kafka-console-consumer.sh for testing and debugging.' },
  { page: 'cheatsheet.html', pageTitle: 'Cheatsheet', section: 'Consumer Group Commands', excerpt: 'kafka-consumer-groups.sh --list --describe --reset-offsets. Monitor and manage consumer groups.' },
  { page: 'cheatsheet.html', pageTitle: 'Cheatsheet', section: 'Producer Config Reference', excerpt: 'acks, retries, linger.ms, batch.size, buffer.memory, compression.type, enable.idempotence.' },
  { page: 'cheatsheet.html', pageTitle: 'Cheatsheet', section: 'Consumer Config Reference', excerpt: 'group.id, auto.offset.reset, enable.auto.commit, max.poll.records, fetch.min.bytes, session.timeout.ms.' },

  // roadmap.html
  { page: 'roadmap.html', pageTitle: 'Learning Roadmap', section: 'Beginner Path', excerpt: 'Start with core concepts: topics, partitions, producers, consumers, consumer groups, offsets.' },
  { page: 'roadmap.html', pageTitle: 'Learning Roadmap', section: 'Intermediate Path', excerpt: 'Delivery semantics, replication, Schema Registry, Kafka Connect, basic performance tuning.' },
  { page: 'roadmap.html', pageTitle: 'Learning Roadmap', section: 'Advanced Path', excerpt: 'Kafka Streams, exactly-once semantics, KRaft, security hardening, capacity planning, production operations.' },

  // interview.html
  { page: 'interview.html', pageTitle: 'Interview Prep', section: 'Beginner Questions', excerpt: 'What is Kafka, topics vs partitions vs offsets, consumer groups, Kafka vs RabbitMQ.' },
  { page: 'interview.html', pageTitle: 'Interview Prep', section: 'Intermediate Questions', excerpt: 'Replication factor, ISR, delivery semantics, log compaction, consumer rebalancing.' },
  { page: 'interview.html', pageTitle: 'Interview Prep', section: 'Advanced Questions', excerpt: 'Exactly-once semantics implementation, Kafka Streams windowing, Schema Registry compatibility modes.' },
  { page: 'interview.html', pageTitle: 'Interview Prep', section: 'Knowledge Quiz', excerpt: 'Test yourself with 6 multiple-choice questions on core concepts, delivery semantics, and performance.' },
];
