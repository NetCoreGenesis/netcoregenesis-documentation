---
id: Data_Access
slug: Data_Access
title: Data Access
sidebar_label: Data Access
---

## Connection Strings

You can find related configuration properties in the files below;
- `coresettings.{EnvironmentName}.json` (Framework Core)
- `appsettings.{EnvironmentName}.json` (Any Microservice)

*Sample merged configuration:*

```json
{  
	...
	"ConnectionStrings":  {
		"GenesisDB": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=GENESIS_DB;",  
		"PostgreSQL": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=YOUR_DB;"  
	},  
	"DefaultDatabase": "PostgreSQL",  
	"GenesisDBType": "PostgreSQL",  
	...
}
```

`ConnectionStrings`
: List of connection strings.

`ConnectionStrings.GenesisDB`
: Connection string of Genesis database.

`ConnectionStrings.PostgreSQL`
: Connection string of your microservice's database, acquired by EF Core context.

`DefaultDatabase`
: Microservice's default database preference.

`GenesisDBType`
: Database provider type of specified Genesis connection string.

> Please check [Connection String Verify](https://www.connectionstrings.com) and be sure it is right.

> To use raw connections, you can call `ConnectionManager.GetConnection()` to get default (or specified) database connection via specified provider's Connection class like SqlConnection, NpgsqlConnection etc.

## Entity Framework Core

By default, EF Core is used and has many providers for dealing with databases such as MSSQL Server, Oracle, PostgreSQL, MySQL, SQLite, DB2, InMemory, Cosmos, Firebird and so on.
> For the whole list, check https://docs.microsoft.com/en-us/ef/core/providers/

## Dapper (As an alternative)

> Dapper is a lightweight ORM (object-relational mapping) product for the Microsoft.NET platform: it provides a framework for mapping an object-oriented domain model to a traditional relational database. Its purpose is to relieve the developer from a significant portion of relational data persistence-related programming tasks.
For more https://dapper-tutorial.net/

Dapper no longer has dependencies in our framework. But we still recommend it as an alternative for heavy, performance-centric database operations if EF Core's performance does not suffice your needs.

## EF Core vs Dapper

Dapper and EF Core are two of the primary ORMs in use in the .NET world, despite the fact that Dapper isn't really an ORM at all; it's more of a mapper library designed to map data results to C# objects. Thus, it's really a very thin layer between your application and the database you are using.

EF Core, on the other hand, is a full-fledged ORM with lots of cool features, including change tracking. These features make this library a bit more cumbersome, and possibly a lot less performant than Dapper.

But, as we have said always, *performance doesn't matter unless you can prove that it matters*, and for most apps the difference in speed between EF Core and Dapper will probably not be noticeable to the average user.
