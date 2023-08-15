---
id: Logging
slug: Logging
title: Logging
sidebar_label: Logging
---

## Transactions

Every request made, response sent and current claims of the user
are logged into **`transactionLogs`** table.

Request in JSON format
![Log request](https://netcoregenesis.com/images/documentation/log-request.png)

Response in JSON format
![Log response](https://netcoregenesis.com/images/documentation/log-response.png)

## Management / Audit Logs

Log search & list:
![Log search & list](https://netcoregenesis.com/images/documentation/Audit_logs_listing.png)

Log Detail:
![Log Detail](https://netcoregenesis.com/images/documentation/Audit_log_detail.png)

## Exclude or Mask a Class Property from Logging

You can simply exclude from logging or hash/mask a Class Property when logging by adding attributes `[IgnoreLogging]`, `[MaskedLogging]` and `[HashededLogging]`.

```cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreType.Attributes;
using CoreType.Types;

namespace Microservice.DataLib.DBModels
{
    public class User
    {
        [Column("userId")]
        public int UserId { get; set; }

        [Required]
        [Column("userName")]
        [StringLength(50)]
        public string UserName { get; set; }

        [Required]
        [Column("userSurname")]
        [StringLength(50)]
        public string UserSurname { get; set; }

        [IgnoreLogging] // Do not log "password" ever
        [Column("password")]
        [StringLength(64)]
        public string Password { get; set; }

        [MaskedLogging(@"\w\w(.*)\w")] // Log the value of "ibanNumber" as masked
        [Column("ibanNumber")]
        [StringLength(33)]
        public string IbanNumber { get; set; }

        [HashedLogging] // Log the value of "email" as hashed
        [Column("email")]
        [StringLength(80)]
        public string Email { get; set; }
    }
}
```

## Errors & Service Logs

Error Handling and Logging middlewares log errors caught to txt files of API/Logs folders.

```
{Your_Application_Name}/Admin/Admin.Svc/Logs
{Your_Application_Name}/{Your_Microservice_Name}/{Your_Microservice_Name}.API/Logs
```

Microservice Log Files:
![Microservice Log Files](https://netcoregenesis.com/images/documentation/Microservice_log_files.png)

## AutoCode Solution Generator

If you get any error through the installation which blocks you, check the log files in **`your_cli_solution_generator_folder/Logs`** folder

## Elasticsearch

You can use Elasticsearch for search and listing of log records.

> TODO: will be elaborated.
