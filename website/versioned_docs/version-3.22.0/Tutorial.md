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

YourMicroserviceName.TypeLib.DBModels.{YourTableName}.cs

YourMicroserviceName.TypeLib.DBModels.{YourTableName}Ex.cs

### 2) DBContext

YourMicroserviceName.DataLib.DBContexts.{YourTableName}Context.cs

YourMicroserviceName.DataLib.DBContexts.{YourTableName}ContextEx.cs

### 3) Repository

YourMicroserviceName.DataLib.Repositories.{YourTableName}Repository.cs

### 4) Validator

YourMicroserviceName.DataLib.Validators.{YourTableName}Validator.cs

### 5) Service

YourMicroserviceName.API.Services.{YourTableName}Service.cs

### 6) Controller

YourMicroserviceName.API.Controllers.{YourTableName}Controller.cs

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
