---
title: Release Notes (v3.19.1)
author: Net Core Genesis
author_url: https://www.netcoregenesis.com/
# author_title: Admin
# author_image_url: https://www.netcoregenesis.com/images/favicon.ico
description: Net Core Genesis Release Notes (Changelog)
image: https://www.netcoregenesis.com/images/NetCoreGenesis_Solution_Base_logo.png
# hide_table_of_contents: false
tags: [release notes]
keywords: [changelog, release, note, release note, 3.19.1]
---

These release notes document all relevant changes(improvements, migration notes, fixes, new features) that have been implemented in a release since the previous release.

<!--truncate-->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Use Solution Generation's [upgrade method](/docs/CLI_Commands#2-upgrade) for a smooth upgrade experience.

<Tabs
    defaultValue="BE_UI_FRAME"
    values={[
        {label: 'BE & FE Frameworks', value: 'BE_UI_FRAME'},
        {label: 'AutoCode Solution Generator', value: 'CLI'},
        {label: 'DB Alter Scripts for Versions', value: 'DB'},
    ]}>

<TabItem value="BE_UI_FRAME">

- Unique email address control added to User and Tenant.
- The language setting can be changed by selecting from the dropdown on header.
- Password Forgot and Reset processes implemented.
- "Live Preview" enhanced with more samples.
- Empty (w/o data) excel template can be downloaded.
- Excel column headers are set to component labels by default and can be changed.
- Now you can manage the view order on the screen and the order in excel separately.
- exportConfig property added to ITypeElement in order to manage excel export related properties such as label, order, exportable, importable.
- A web service used to be called upon clicking on each line of the table. Now, the data of a record can be set to in the form without calling a service. .(forceGetRecordFromTable: true)
- The searching function implemented for filtering in a large number of left-menu items.
- A tenant could only delete his own data. We re-implemented this feature to solve it centrally in BaseContext.
- In Communication middleware, While defining the rule, the data of Request and Response objects can now be compared (Request.BrandId != Response.Data.BrandId)
- UIHelperMethods.GetParameter enhanced.
- UIHelperMethods.GetTenant added to be used in Communication Middleware.
- Parameters' value changed from int to string. Thus, codes can be set as a value other than just integer.
- Predefined lowercase-regex fixed.
- Custom hardcoded options can be set for dropdown and toggle components.
- Numeric_Input values aligned right by default.
- Some extra permission checks implemented in Department.js.
- Menu items can be set to be expanded by default.
- Progress_Bar and Multiple_ProgressBar added as new components.
- Expand-Collapse property of the groups can be managed now (bool isCollapsible).
- Communication templates can be triggered manually now without binding to a service/method (CommunicationManager.Mail.SendAsync(......))
- You can switch between Tenants easily by selecting from the dropdown on the header (ie, switching to a subtenant)
- Error/warning message component has been replaced with a more capable one.
- HTML_Editor has been replaced with a more capable one. Now images can be embedded and so many new features.
- Oracle provider upgraded.
- Some hardcoded messages changed to multi-language (getLocalizedText).
- Several minor improvements and bug-fixes implemented.

</TabItem>

<TabItem value="CLI">

- Instead of creating from scratch, an existing GenesisDB can be selected for project creation.
- "Trusted connection" support added for connection string.
- Table count and first 20 table names are displayed in summary just before solution creation.
- Oracle provider upgraded to Oracle Entity Framework Core (EF Core) 3.19.0 Driver.
- Oracle 19C support added, PL/SQL scripts fully revised.
- Comments and informative messages have been improved.
- Several minor improvements and bug-fixes have been implemented.

</TabItem>

<TabItem value="DB">

```sql
-- PostgreSQL

ALTER TABLE "coreParameters" ALTER COLUMN value varchar(50) NOT NULL; # changed from int to string
```

</TabItem>

</Tabs>
