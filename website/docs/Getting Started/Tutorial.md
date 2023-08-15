---
id: Tutorial
slug: Tutorial
title: Tutorial
sidebar_label: Tutorial
---

This tutorial below explains the basic files of both backend and frontend you need to add/edit for a page/process.

> Click for [Folder Structure](General/Folder_Structures.md) of the projects

## Backend

> Click for details of [Adding a New Backend Process Step By Step](General/Sample_Page.md#backend)

### 1) DB Models

*YourMicroserviceName.TypeLib.DBModels.{YourTableName}.cs*

*YourMicroserviceName.TypeLib.DBModels.{YourTableName}Ex.cs*

### 2) DBContext

YourMicroserviceName.DataLib.DBContexts.{YourTableName}Context.cs

YourMicroserviceName.DataLib.DBContexts.{YourTableName}ContextEx.cs

### 3) Repository
Classes which implements data access logic. A repository represents a data entity, common CRUD operations and other special cases. The application layers consumes the APIs provided by the repository and does not need to care about how is implemented.

*YourMicroserviceName.DataLib.Repositories.{YourTableName}Repository.cs*

### 4) Validator
FluentValidation classes that validate requests before processing it.

*YourMicroserviceName.DataLib.Validators.{YourTableName}Validator.cs*

### 5) Service
Classes where business logic is implemented between controllers and repositories.

*YourMicroserviceName.API.Services.{YourTableName}Service.cs*

### 6) Controller
Classes that handle HTTP requests. The public methods of the controller are called action methods or simply actions. When the Web API framework receives a request, it routes the request to an action. To determine which action to invoke, the framework uses a routing table.

*YourMicroserviceName.API.Controllers.{YourTableName}Controller.cs*

## UI / Frontend

You'll generally be dealing with 4 files in  `src`  folder for a standard page which you can manage easily with JSON objects without coding javascript or typescript.
> Click for details of [Adding a New UI Page Step By Step](General/Sample_Page.md#ui--frontend)

### 1) Menu Item Component

views/Routes/{YourTableName}/{YourTableName}PageConfig.js

### 2) Page Config

views/Routes/{YourTableName}/{YourTableName}PageConfig.tsx

### 3) Model Class

entities/{YourTableName}.ts

### 4) Sidebar Menu & Navigation

pages.js

> To get familiar with the declarative JSON format for 2) Page Config and 3) Model Class, you can practice at **[Management / Live Preview](https://demo.netcoregenesis.com/livePreview)**
