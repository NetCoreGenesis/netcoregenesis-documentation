---
id: Server_Requirements
slug: Server_Requirements
title: Server Requirements
sidebar_label: Server Requirements
---
The overall system can be deployed on any cloud vendor such as Microsoft Azure, AWS-Amazon Web Services, Google Cloud, Digital Ocean, or UpCloud.

## Minimum Requirements

As minimum recommendations:
- Operation System: Ubuntu (16+ preferred), Fedora, CentOS
- Web Server: Nginx (preferred) or IIS
- Disk: 200GB SSD
- RAM: 8GB
- CPU: 4 Core

## Server Topology Options

### a) All-In-One Image

- All components installed in one VM

### b) Corporate

- 1 x App Server (Redis, Kafka, CI/CD)
- 1 x DB Server

### c) Enterprise

- 2 x App Server
- 1 x DB Server
- 1 x Redis+Kafka Server
- 1 x CI/CD Deployment Server
