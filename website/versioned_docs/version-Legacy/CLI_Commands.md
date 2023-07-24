---
id: CLI_Commands
slug: CLI_Commands
title: CLI Commands for AutoCode Solution Generator
sidebar_label: CLI Commands
---

Just after running the command, be sure it is the latest version and up-to-date.
![CLI_is_up_to_date](https://netcoregenesis.com/images/documentation/CLI_is_up_to_date.png)

![CLI_is_not_up_to_date](https://netcoregenesis.com/images/documentation/CLI_is_not_up_to_date.png)
*_Version numbers are representational_

## 1) Create

### From scratch

```
./genesis create --path {full_or_relative_path_to_new_project}
```

> `genesis` command may not be in the system path, so you may need to use  `./genesis` instead of `genesis`

If the specified path does not exist, it will be created. If you don’t specify a path, it will be created on your current folder with the name of **{YourSolutionName}**

**Some examples:**

```
./genesis create ./
./genesis create --path ./MyUnicornProject
```
  
### Using an existing config

If you've already ran `create` command before, you have `config.json` file/s in **`Configs`** folder.

When you use that JSON file, you'll be skipping all the questions asked throughout generation process.

```
./genesis create --from-config {your_config_file_in_Configs_folder.json}
```

Sample `config.json`:

```json
{
	"Path": "/PathSpecified/genesis-osx-x64-2019.12.22",
	"TemplateType": 1,
	"ApplicationName": "My_Application",
	"MicroserviceNames": [
		"Microservice1"
	],
	"BFFName": null,
	"BFFPort": null,
	"GenesisDatabaseType": 2,
	"GenesisConnectionStringChoice": 2,
  	"UseGenesisDBIfExists": false,
	"GenesisConnectionString": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=GENESIS_DB_NAME;",
	"DatabaseTypes": [
		2
	],
	"ConnectionStringChoices": [
		2
	],
	"Ports": [
		5051
	],
	"ConnectionStrings": [
		"User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=YOUR_DB_NAME;"
	],
	"Tables": [
				[
					"public.SomeTable1",
					"public.SomeTable2",
					"public.SomeTable3",
					"public.SomeTable4",
				]
	],
	"UIChoice": 2,
	"UIPort": 3000,
	"IdentityPort": 5000,
	"AdminSvcPort": 5050,
	"NoBuild": false,
	"Verbose": false
}
```

## 2) Upgrade

Upgrades to the latest versions of the frameworks and Nuget packages into specified existing project.

```
./genesis upgrade --path {full_or_relative_path_to_existing_solution}
```

You'll be asked:

```cs
Upgrade Choice
(1) - (Basic) Only update Nuget packages.
(2) - (Complex) Update & Merge whole solution(s).
```

## 3) Update

> We recommend making a [complex] `./genesis upgrade` first and then continue with `update`.

a) Start by running the command:

```
./genesis update --path {full_or_relative_path_to_existing_solution}
```

b) Please select projects to proceed.

```
 ◯  Microservice.TypeLib
 ◉  Microservice.DataLib
 ◯  Microservice.API    
 ◯  IdentityServer      
 ◯  Admin.Type          
 ◯  Admin.Data          
 ◯  Admin.Svc           
 ◯  CoreData            
 ◯  CoreSvc             
 ◯  CoreType            
 ◯  Scheduler.Core      
 ◯  Scheduler.API
```

c) Choose between Code-First or Database-First approaches:

```cs
Please select action to proceed.
(1) - Migration (Code-first approach) - Database will be updated according model/context changes
(2) - Scaffold (Database-first approach) - This will create models by database tables
(3) - Skip
```

> Don't worry! Even if you insist to override the project files, Solution Generator will compare the hash values of the old-new files and if there is a difference, the old one is going to be backed up first.

## 4) Version

Check current version of AutoCode Solution Generator

```
./genesis --version
```

> _**Note**: To see available functions, run_  **`./genesis create --help`**

## Troubleshooting

If you get any error, that's probably you have an older version of the AutoCode Solution Generator working in your machine, causing mismatch between AutoCode Solution Generator and the latest project boilerplate.

So check and download [AutoCode Solution Generator's current version](Download_CLI_Solution_Generator.md).
