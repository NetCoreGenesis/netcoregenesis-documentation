---
id: Tutorial
slug: Tutorial
title: Tutorial
sidebar_label: Tutorial
---

This tutorial below explains the basic files of both backend and frontend you need to add/edit for a page/process.

> Click for [Folder Structure](Folder_Structures.md) of the projects

## Backend

> Click for details of [Adding a New Backend Process Step By Step](Sample_Page.md#backend)

### 1) Model

YourMicroserviceName.DataLib.DBModels.YourModel.cs

### 2) DBContext.cs

YourMicroserviceName.DataLib.DBContexts.YourDBNameContext.cs

### 3) Repository

YourMicroserviceName.DataLib.Repositories.YourModelRepository.cs

### 4) Validator

Microservice.DataLib.Validators.YourModelValidator.cs

### 5) Controller

Microservice.API.Controllers.YourModelController.cs

## UI / Frontend

You'll generally be dealing with 4 files in  `src`  folder for a standard page which you can manage easily with JSON objects without coding javascript or typescript.
> Click for details of [Adding a New UI Page Step By Step](Sample_Page.md#ui--frontend)

### 1) Menu Item Component

views/Routes/YourModel/YourModelPageConfig.js

### 2) Page Config

views/Routes/YourModel/YourModelPageConfig.tsx

### 3) Model Class

entities/YourModel.ts

### 4) Sidebar Menu & Navigation

pages.js

> To get familiar with the declarative JSON format for 2) Page Config and 3) Model Class, you can practice at **[Management / Live Preview](https://demo.netcoregenesis.com/livePreview)**
