---
id: Using_CLI_Solution_Generator
slug: Using_CLI_Solution_Generator
title: Using AutoCode Solution Generator
sidebar_label: Using AutoCode Solution Generator
---

## Purpose

This document aims to help you step by step, to create your solution/project and generate backend web services & UI pages from end to end by using Net Core Genesis’ CLI-Command Line Interface just in 3-5 minutes.

Before continuing, please have a look at [our Presentation about AutoCode Solution Generator Process and its Outcomes](https://netcoregenesis.com/documents/CLI_Code_Generation_Presentation.pdf).
> It's assumed that you already purchased and created your Net Core Genesis account.

## Prerequisites

 1. Please check  **[\[Prerequisites\]](Before%20We%20Start/Prerequisites.md)**  section and complete them before continuing.
 2. Also remember that AutoCode Solution Generator uses **Database-First** approach to create your solution/project.

## Download CLI based AutoCode Solution Generator file using one of the links below according to your operating system

**Windows**  
[https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=win-x64](https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=win-x64)

**MAC OS**  
[https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=osx-x64](https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=osx-x64)

**Linux**  
[https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=linux-x64](https://api.netcoregenesis.com/Genesis/download/cli?operatingsystem=linux-x64)

*_If you've already downloaded before, be sure it is the latest version and up-to-date_
![](https://netcoregenesis.com/images/documentation/CLI_is_up_to_date.png)
** _Version numbers are representational_

> _**Note**: In theory, you will NOT get a security warning in your browser. But if the opposite happens, first be sure you download it from one of the links above or [let it be checked by Kaspersky VirusDesk](https://virusdesk.kaspersky.com/)_

You’ll get a file named "genesis-**yourOSname-x64**.tar.gz"
- Unzip the file
- Open a Terminal
- Change directory to the unzipped folder

```
cd  genesis-YourOSname-x64
```

> ***Note***  _: If you get any error through the installation which blocks you, check the log files in_ **_genesis-yourOSname-x64/Logs_**

***

## Start creating a project

Run the create command:

```
./genesis create --path {full_or_relative_path_to_new_project}
```

If you've already ran create command before, you have a config file in **Configs** folder

```
./genesis create --from-config {your_config_file_in_Configs_folder.json}
```

If the specified path does not exist, it will be created. If you don’t specify a path, it will be created in your AutoCode Solution Generator's folder with the name of **{YourSolutionName}**

**Some examples:**  

```
./genesis create 
./genesis create --path ./MyUnicornProject 
```

From Config file  

```
./genesis create --from-config config_create_2020-07-01-14-53.json
```

> _**Note**: To see available functions, visit [AutoCode Solution Generator Commands](CLI_Commands.md) section.

## Please enter your Genesis subscription credentials to authenticate;

```
E-mail address :  
Password:
```

## After authentication, dependencies will be checked

If you see each one is checked, you’re ready to go.
```cs
Checking Dependencies...
✔  Dotnet SDK 7.0+ (Required)
✔  EF Core Command-line Tools 5.0+ (Required)
✔  npm or yarn (Required) 
✔  Docker (Optional)
✔  Docker Compose (Optional)
✔  git (Optional)
✔  Node.js 10.14.0+ (Optional)   
```  
_** Version numbers are representational. Please check [Prerequisites](Before%20We%20Start/Prerequisites.md)_

## Please choose template type

There are 2 architecture types. If you are unsure about it, generally option “(1) - Single Microservice (Monolithic)” will be suitable for you.

```
Type the number and press enter
(1) - Single Microservice (Monolithic):  #This is the standard MVC project
(2) - Multiple Microservices and a Gateway:  #If you follow a Microservices architecture, choose this one
```

## Application/Solution Name : Default=(My_Application)

Specify any name of your choice for your solution and press enter.  

> _Use only alphanumeric, . (dot) and \_ (underscore) characters._

> You can skip simply by pressing enter, the default name will be **My_Application**.

## Microservice Name : Default=(Microservice)

Specify any name of your choice for your services and press enter.  

> _Use only alphanumeric and \_ (underscore) characters._

> You can skip simply by pressing enter, the default name will be  **Microservice**.

If you’ve chosen “(2) - Multiple Microservices and a Gateway” in previous steps, You will be asked for BFF and Microservice names separately.

```
i) Backend For Frontend Name : Default=(BFF)  
ii) Microservice 1 Name : Default=(Microservice_1) 
iii) Microservice 2 Name : Default=(Microservice_2) 
iv) Microservice 3 Name : Default=(Microservice_3)
```

## Database Type

> **Warning #1**: Be sure your database is up and running properly with the given connection data from now on.

> **Warning #2**: The DB user you provide needs the privileges to access system tables.

```
Type the number and press enter.  
(1) - MSSQL  
(2) - PostgreSQL  
(3) - MySQL  
(4) - Oracle
```

## How do you want to create your connection string?

This connection string will be used to scaffold your web services and UI pages from your existing database. So be sure it is correct.

```
Type the number and press enter.
(1) - Provide full connection string. (use this option for Trusted_Connection=true)
(2) - Use connection string builder to create it. #If you are not sure, use this option
(3) - Leave it blank. (Scaffold step cannot be used)
```

> If you choose to provide connection string, please check [Connection String Verify](https://www.connectionstrings.com) and be sure it is right.

**Some connection string examples:**

> _**Warning:**  ignore { and } characters when you replace with your real data. Also change user name/id if necessary._

1) **MSSQL**  
*Server=127.0.0.1;Database={Your_DB_Name};User Id=sa;Password={Your_User_Password};*

2) **PostgreSQL**  
_User ID=postgres;Password={Your_User_Password};Host=127.0.0.1;Port=5432;Database={Your_DB_Name};Pooling=true;_

3) **MySQL**  
_Server=localhost;Database={Your_DB_Name};Uid=root;Pwd={Your_User_Password};_

An example of MySQL DB for option "(2) - Use connection string builder to create it":

```
Database Name : MyDB_Name
Host : 127.0.0.1  
Port: 3306  
User: root
```

## For trusted connections such as Windows Authentication

```
Do you want to connect via trusted connection?
(y/yes) - Yes
(n/no) - No
```

## Please select 'schemas' to use at scaffold step.

If there is only 1 schema, this step will be skipped.  
*If there are more than one, choose Schemas in order to fetch their 'tables'.*

```shell
(Press <space> to select/deselect, <a> to toggle all, <enter> to continue)   
    ◉ Schema1  
    ❯◯ Schema2  # excluded by pressing <space>
    ◉ Schema3
```

## Please select 'tables' to use at scaffold step.

Choose tables in order them to be used for generating web services and UI pages.

```shell
(Press <space> to select/deselect, <a> to toggle all, <enter> to continue)
◉ Table1  
❯◯ Table2  # excluded by pressing <space>
◉ Table3  
◉ Table4  
◉ Table5
```

## Please enter valid information to create Genesis database.

Genesis database is the core database required for framework to run.

> **Warning**: The DB user you provide needs the privilege to create database.

You can either specify the same database as above or use/create a separate one. If there is not an existing database with the name specified, migration step will create it.

```
Database Type
    Type the number and press enter.  
    (1) - MSSQL  
    (2) - PostgreSQL  
    (3) - MySQL  
    (4) - Oracle
```

**How do you want to create your connection string?**

You can use an existing Genesis database

```
Type the number and press enter.
(1) - Provide full connection string. (use this option for Trusted_Connection=true)
(2) - Use connection string builder to create it. #If you are not sure, use this option
```

> If you choose to provide connection string, please check [Connection String Verify](https://www.connectionstrings.com) and be sure it is right.

## Do you want to create UI project?

> An administration panel including all of your pages with labels, components, rules, validations and so on from your database will be created from scratch. It is developed in **React JS**.

```
Type the number and press enter.
(1) - Create empty UI project.  
(2) - Create UI project and generate pages/models from database. (Recommended)
(3) - Skip.
```

## UI Project Name : Default=(UI)

Specify any name of your choice for your UI project and press enter.

> _You can skip simply by pressing enter, the default name will be **UI**._

## You’ll see a summary of your choices

```
-Summary-  
    Template Type : Single Microservice (Monolithic)  
    ApplicationName : Your_Application_Name  
    Database Type(Genesis): MySQL  
    Connection string(Genesis) : Server=localhost;Database=Your_GenesisDB_Name;Uid=Your_User_Name;Pwd=******************;
    Use existing Genesis Database: False
	Identity Server Port : 5000
	Admin Project Port : 5050
	
	UI Choice : Create UI project and generate pages/models from database.
	UI Port : 3000
    Path : /Your_CLI_Folder/My_Application  
    Microservice(s)  
	    MicroserviceName : Your_Microservice_Name  
	    Database Type: MySQL  
	    Data Source : Server=localhost;Database=Your_DB_Name;Uid=Your_User_Name;Pwd=Your_User_Password; 
	    Port: 5051
        Total Table Count: xx
        Tables (Only First 20 Displayed): table1, table2, table3, ...
    Owned Modules: None
-Summary end-  

Saved current configuration.(Pass '--from-config config_create_20YY-MM-DD-hh-mm.json' argument to restore config)
```

## Do you want to proceed ?

```
(y/yes) - Yes  
(n/no) - No
```

## If you are satisfied with the summary, type yes and press enter

Building projects can take several minutes to complete, have a coffee and lean back.

## Do you want to run the projects with Docker ?

If you are a professional, use Docker. Otherwise <**no**> will be more suitable for you.

>_If you choose <**yes**>, please keep in mind that all projects (Backend, UI, Redis, Kafka etc.) will be copied to, built and ran on Docker, so it may take up to 20-25 mins._

```
(y/yes) - Yes  
(n/no) - No
```

## Process completed successfully.

Congratulations body. You have an almost well structured professional project. :v:

```
You can run the UI project with following codes.  
    ---> cd /projectPathSpecified/My_Application/UI  
    ---> yarn start (recommended)
    or  
    ---> npm start
    
You can run the API projects from following solution file.  
    Solution file path :  projectPathSpecified/My_Application/My_Application.sln

Process completed successfully.
```
  
Now jump to **[How To Run Your Web Application](Running_Your_Web_Application.md)** and see what's happening.

> ***Note***  _: If you get any error through the installation which blocks you, check the log files in_ **_genesis-yourOSname-x64/Logs_** folder.

## Troubleshooting

### Can't connect to SQL Server DB. Error: The TCP/IP connection to the host [IP address], port 1433 has failed.

1. Open the SQL Server Configuration Manager.
2. Expand SQL Server Network Configuration for the server instance in question.
3. Double-click "TCP/IP".
4. Under the "Protocol" section, set "Enabled" to "Yes".
5. Under the "IP Addresses" section, set the TCP port under "IP All" (which is 1433 by default).
6. Under the "IP Addresses" section, find subsections with IP address 127.0.0.1 (for IPv4) and ::1 (for IPv6) and set both "Enabled" and "Active" to "Yes", and TCP port to 1433.

Find this useful [https://stackoverflow.com/questions/12774827/cant-connect-to-localhost-on-sql-server-express-2012-2016](https://stackoverflow.com/questions/12774827/cant-connect-to-localhost-on-sql-server-express-2012-2016)

### Can't connect to DB server

1. Check your DB user's privileges
2. Check firewall access rules (IP, port restrictions etc.)
3. Try using full connection string instead of the builder

### Failed to create database

You may need to install [EF Core Tools](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet) first. _(Please check [Prerequisites](Before%20We%20Start/Prerequisites.md))_

### Failed scaffolding

Check your DB user's privileges. You may need to give it permissions to access system tables and create new database.

### EF Core Command-line Tools 3.0+ (Required) No such file or directory

There may be conflicts between runtimes. So check the versions and remove the old and unnecessary ones.
> https://docs.microsoft.com/en-us/dotnet/core/install/remove-runtime-sdk-versions?pivots=os-macos#uninstall-net

```
dotnet --list-sdks
dotnet --list-runtimes

version="x.x.x"
sudo rm -rf /usr/local/share/dotnet/sdk/$version
sudo rm -rf /usr/local/share/dotnet/shared/Microsoft.NETCore.App/$version
sudo rm -rf /usr/local/share/dotnet/shared/Microsoft.AspNetCore.All/$version
sudo rm -rf /usr/local/share/dotnet/shared/Microsoft.AspNetCore.App/$version
sudo rm -rf /usr/local/share/dotnet/host/fxr/$version
```
