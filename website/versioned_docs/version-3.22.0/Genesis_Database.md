---
id: Genesis_Database
slug: Genesis_Database
title: Genesis Database
sidebar_label: Genesis Database
---

Genesis database is the core database required for framework to run.
> It will be created by [AutoCode Solution Generator](Using_CLI_Solution_Generator.md). So we strongly recommend creating your project by AutoCode Solution Generator instead of downloading the boilerplate at first hand.

| Table | Description |
|--|--|
| authActions | Actions of the resources |
| authResources | Resources for authorization |
| authTemplate | Permission templates and roles for users |
| authTemplateDetail | Rights of authResources  |
| authUserRights | Rights of users |
| communicationDefinitions | Email and SMS definitions |
| communicationTemplates | Templates for messages |
| coreCompany | Companies |
| coreDepartments | Departments of companies |
| coreParameters | All parameters with translations for multi-language |
| coreUsers | System and tenants' users  |
| notification | Notifications sent |
| notificationSettings | Notification settings to communicate |
| sampleEmployee | Live preview type #1 |
| sampleEmployeeTask | Live preview type #2 |
| tenants | Multi-Tenancy |
| transactionLogs | Transaction logs including request made, response sent and current claims of the user |

| Stored Procedure | Description |
|--|--|
| adm_sel_authorization_claims_schema |  |
| adm_sel_authorization_claims |  |
| adm_sel_authtemplatedetails |  |
| adm_sel_labels |  |
| adm_ins_transactionlogs |  |
