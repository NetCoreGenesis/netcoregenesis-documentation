---
title: Release Notes (v7.23.0)
author: Net Core Genesis
author_url: https://www.netcoregenesis.com/
description: Net Core Genesis Release Notes (Changelog)
tags: [release notes]
keywords: [changelog, release, note, release note, 7.23.0]
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
        {label: 'AutoCode Solution Generator', value: 'CLI'}
    ]}>

<TabItem value="BE_UI_FRAME">

##### *Backend*

- .NET projects upgraded to `.NET 7.0`.
- All packages upgraded & migrated accordingly.

</TabItem>

<TabItem value="CLI">

- `EF Core Command-line Tools` minimum version requirement increased to `5.0` for dependency checks.

</TabItem>

</Tabs>
