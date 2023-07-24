---
id: Scheduler_and_Background_Jobs
slug: Scheduler_and_Background_Jobs
title: Scheduler & Background Jobs
sidebar_label: Scheduler & Background Jobs
---

**Hangfire** is a multi-threaded and scalable task scheduler built on client-server architecture with the intermediate storage in a database. No Windows Service or separate process is required.

## Fire-and-forget jobs

Fire-and-forget jobs are executed  **only once**  and almost  **immediately**  after creation.

```cs
var jobId = BackgroundJob.Enqueue(
    () => Console.WriteLine("Fire-and-forget!"));
```

## Recurring jobs

Recurring jobs fire  **many times**  on the specified  **CRON schedule**.

```cs
RecurringJob.AddOrUpdate(
    () => Console.WriteLine("Recurring!"),
    Cron.Daily);
```

## Delayed jobs

Delayed jobs are executed  **only once**  too, but not immediately, after a certain  **time interval**.

```cs
var jobId = BackgroundJob.Schedule(
    () => Console.WriteLine("Delayed!"),
    TimeSpan.FromDays(7));
```

## Continuations

Continuations are executed when its parent job  **has been finished**.

```cs
BackgroundJob.ContinueWith(
    jobId,
    () => Console.WriteLine("Continuation!"));
```

> Check for more on [HangFire official web site](https://www.hangfire.io/)

<br/><br/>

## How Hangfire is Wrapped & Used in Net Core Genesis

All generated microservices inherit from CoreSvc.dll, thus registering themselves with the Hangfire scheduler subsytem. In CoreSvc startup, Hangfire is injected with Redis storage as backend (can be switched to other supported storage options, but choosing a distributed storage subsytem is recommended if multiple microservices will use the same scheduler infrastructure)

[![HangfireServiceDI](https://netcoregenesis.com/images/documentation/doc-scheduler-coresvc.png)](https://netcoregenesis.com/images/documentation/doc-scheduler-coresvc.png)

Hangfire Scheduler can be utilized by 2 main techniques in NCG platform.

1. The most basic usage is to directly call the Hangfire methods inside Repository classes. The following method will start a job that will execute every minute:

   ```cs
   RecurringJob.AddOrUpdate(() => System.Console.WriteLine("Your Minutely Running Method"), Cron.Minutely);
   ```

   [![HangfireSimpleUsage](https://netcoregenesis.com/images/documentation/doc-scheduler-directusage.png)](https://netcoregenesis.com/images/documentation/doc-scheduler-directusage.png)

2. The other usage technique is to start the background jobs in **Scheduler.API** project which is generated during the solution generation process. The layout of this project is seen in the image below, as the **(1.)** CoreSvc project reference, **(2.)** Hangfire main controller that enables you to add, list, delete, start various types of (delayed, recurring.. etc) jobs. At this step **(3.)** it's important to have an appsettings.json file (with dev, test and prod variations) that specifies from which URL and port the Scheduler API will start. Otherwise, Scheduler.API can try to start from undesired or already in-use ports:

   ```json
   {
     "ApplicationUrl": "http://0.0.0.0:5001"
   }
   ```

   [![HangfireSchedulerAPI](https://netcoregenesis.com/images/documentation/doc-scheduler-api.png)](https://netcoregenesis.com/images/documentation/doc-scheduler-api.png)

<br/>

After you start the Scheduler.API project, the Hangfire dashboard will load from the URL provided:

[![HangfireSchedulerDashboard](https://netcoregenesis.com/images/documentation/doc-scheduler-dashboard.png)](https://netcoregenesis.com/images/documentation/doc-scheduler-dashboard.png)

>It's recommended that you code the invocation of your background jobs within the **Scheduler.API** project inside the `HangFireTasksController.cs.` Please check the contents of this class for usage samples. When defined successfully, running and finished jobs will be observable and manageable over the Hangfire Dashboard.

<br/>

>There is another way of adding a background job without manual coding in C#. You can also add a job definition over the dashboard in JSON format:

[![HangfireSchedulerAddRecurringWithoutCode](https://netcoregenesis.com/images/documentation/doc-scheduler-addrecurring.png)](https://netcoregenesis.com/images/documentation/doc-scheduler-addrecurring.png)

Here's an example  job definition in JSON format (Bearer token has been shortened):

```json
{
  "Url": "http://localhost:5050/Parameter/insert",
  "Method": "POST",
  "Data": "{\"parameterId\": 0, \"keyCode\": \"test\", \"parentValue\": 0, \"value\": 0, \"orderIndex\": 0, \"language\": \"EN\", \"status\": 0, \"description\": \"string\", \"translations\": { \"SE\": \"Kommunikationsmappning\", \"en\": \"Communication Mappings\", \"DE\": \"Kommunikationszuordnung\" }}",
  "ContentType": "application/json",
  "Timeout": 5000,
  "Cron": "* * * * *",
  "JobName": "Test parameter update",
  "QueueName": "DEFAULT",
  "AgentClass": "",
  "SendSucMail": false,
  "SendFaiMail": true,
  "Mail": "",
  "EnableRetry": false,
  "Headers": {
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNGJhNDNhZGE5YzJhYjUyZDI5Y2MyMGRkODMxZmRkIiwidHlwIjoiYXQrand0In0.qvbuyfJShLmiJFj1hAKqArHRMbAV0_C6EvT7qiTIAgt9y8uJPPub9T8fh2QZvLwdPHe_qpfwpgL905tKaV"
  },
  "BasicUserName": "",
  "BasicPassword": ""
}
```

<br/>

>In order for the Scheduler system to call a method from outside, it requires to provide a Bearer token. In your Identity Server configurations, you'll find a clientId already defined for Scheduler. For security purposes, make sure you regularly obtain a new token and adjust the expiration time carefully.
