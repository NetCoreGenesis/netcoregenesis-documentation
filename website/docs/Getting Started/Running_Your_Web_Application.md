---
id: Running_Your_Web_Application
slug: Running_Your_Web_Application
title: Run Your Web Application
sidebar_label: Run Your Web Application
---

If you have finished installing and scaffolding your entire project, in order to run and test it please follow the steps below:

## A) Run Redis and Kafka

You need to run **Redis Cache**  *(must)* and **Kafka Event Streamer**  *(optional)* services in Docker first.

> **Warning**: You don't have to run them on Docker but if you'll, be sure your Docker is up and running properly.

Open a Terminal and go to your project's folder

```
cd {Your_Application_Full_Path}
```

Run the command below in order to install & start Redis Cache instance.

```
docker-compose up redis
```

or also Kafka & Zookeeper instances *(optional)*

```
docker-compose up redis kafka
```

To check if everything is ok for running active docker services, run

```
docker ps
```

or to list all

```
docker ps -a
```

Check 2 services namely **{Your_Application_Name}_redis_1** and **{Your_Application_Name}_kafka_1** (optional) are running.

You should see something like this. [![](https://netcoregenesis.com/images/documentation/docker-ps-for-redis-kafka-zookeeper.png)](https://netcoregenesis.com/images/documentation/docker-ps-for-redis-kafka-zookeeper.png)

## B) Start your 3 main services

> We assume that you use Visual Studio as IDE.

**i)** Open your .Net Core solution which is **{Your_Application_Name}.sln** in Visual Studio

**ii)** Right click on **{Your_Application_Name}** solution and click "Set Startup Projects..."
[![](https://netcoregenesis.com/images/documentation/Visual_Studio_set_start_up_projects.png)](https://netcoregenesis.com/images/documentation/Visual_Studio_set_start_up_projects.png)

**iii)** Select `Admin.Svc`, `IdentityServer` and `{MicroserviceName}.API` and click OK
[![](https://netcoregenesis.com/images/documentation/Visual_Studio_set_choose_multiple_projects.png)](https://netcoregenesis.com/images/documentation/Visual_Studio_set_choose_multiple_projects.png)

> If you have multiple microservices, additionally choose other `{MicroserviceName}.API` projects to be started

**iv)** Run the solution

> **IdentityServer** will be running on [http://localhost:5000/](http://localhost:5000/)  

> **Admin.Svc** will be running on [http://localhost:5050/swagger](http://localhost:5050/swagger)

> **{MicroserviceName}.API** will be running on [http://localhost:5051/swagger](http://localhost:5051/swagger)

## C) Start your Admin Panel (UI part)

Change directory to the UI project

```
cd {Your_Application_Name}/UI
```

Run yarn or npm command as shown below

```
yarn start (recommended)
```

or

```
npm start
```

> **UI** will be running on [http://localhost:3000](http://localhost:3000)

**Enter the credentials below when login page appears in browser**

```
Username: test@test.com
Password: 123456
```

> You can create new users by using **Management / User / New Record**

## Log Folders and Files

**For .Net Core Solution logs**

```
{Your_Application_Name}/Admin/Admin.Svc/Logs
{Your_Application_Name}/{Your_Microservice_Name}/{Your_Microservice_Name}.API/Logs
```

**AutoCode Solution Generator logs**

```
your_solution_generator_folder/Logs
```

**Transaction logs**

Check Genesis database’s **transactionLogs** table.

> To deploy your projects on a web server, visit [Deployment](Server%20&%20System/Deployment.md)
