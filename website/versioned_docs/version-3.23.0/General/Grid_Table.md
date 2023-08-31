---
id: Grid_Table
slug: Grid_Table
title: Grid
sidebar_label: Grid
---

We currently use Ag-Grid's Community Edition. It is wrapped and customized according to the Genesis platform's requirements.

They claim to have the best Javascript grid in the world :)
![Ag-Grid](https://netcoregenesis.com/images/documentation/ag-grid.png)

> Please visit for more https://www.ag-grid.com/react-grid/

## How can I customize and have a similar look and feel to the image above?

To change grid's properties, you can specify the props you want via the tableConfig.customProps field in the relevant tab in your page config file such as `views/Routes/{YourModel}PageConfig.tsx`
```js
import React from 'react';
import { IPageConfig, Methods, pageConfigWrapper } from '../../../../common/typeConfig';
import { getLocalizedText } from '../../../../common/localizationManager';
import YourModel from '../../../../entities/YourModel.ts';

const { LIST, GET, INSERT, UPDATE, DELETE, EXPORT, IMPORT } = Methods;

var pageConfig: IPageConfig = {
    headerTitle: getLocalizedText('SEARCH_LIST_TITLE'),
    tabs: [
        {
            title: getLocalizedText('TITLE_DETAIL'),
            type: YourModel,
            resourceCode: 'YourModel_resource_code',
            list: { url: 'YourModel/list' },
            get: { url: 'YourModel/get' },
            insert: { url: 'YourModel/insert' },
            update: { url: 'YourModel/update' },
            delete: { url: 'YourModel/delete' },
            import: { url: 'YourModel/bulkSave' },
            allowedMethods: [ LIST, GET, INSERT, UPDATE, DELETE ],
            tableConfig: {
               // Sample grid properties
              customProps: {
                rowSelection: 'multiple',
                rowDeselection: true,
                rowMultiSelectWithClick: true,
                multiSortKey: 'ctrl',
                isRowSelectable: (rowNode) => hasBlockingActivity(rowNode.data)
              }
            },
        }
    ]
};

export default pageConfigWrapper(pageConfig);
```

> For all properties, visit https://www.ag-grid.com/react-data-grid/grid-properties/

## Does it have lazy-loading feature?

Yes, by default 100 records (configurable) are fetched. When the end of it reached, automatically next 100 are fetched from server.

## How do built-in search, filter and ordering/sorting functions work?

Whenever a change done, related service is called instantly to fetch relevant data set.

## Override the buttons (edit-delete) on the right handside of each row

Use `actionColumnRenderer` function property  of `tableConfig` in `YourModelPageConfig.tsx`.

```js
import React from 'react';
import ActionRenderer from '../../../components/ActionRenderer';
import Button from '../../../components/Button';
.....

var pageConfig: IPageConfig = {
  headerTitle: getLocalizedText('SEARCH_LIST_TITLE'),
  tabs: [
    {
      title: 'Page Title',
      type: About,
      resourceCode: 'Some_Resource_Code',
      editOnModal: false,
      tableConfig: {
          actionColumnRenderer: (props) => {
              return <>
                  <ActionRenderer {...props} /> {/* Standard Edit and Delete buttons of Table */}
                  <ChangePasswordActionButton {...props} /> {/* Your custom buttons */}
              </>
          }
      },
      list: {
        url: `${Constants.ApiURL}/someApiService/list`
      },
      get: {
        url: `${Constants.ApiURL}/someApiService/get`
      },
      insert: {
        url: `${Constants.ApiURL}/someApiService/insert`
      },
      update: {
        url: `${Constants.ApiURL}/someApiService/update`
      },
      delete: {
        url: `${Constants.ApiURL}/someApiService/delete`
      },
      import: {
        url: `${Constants.ApiURL}/someApiService/bulkSave`
      },
      allowedMethods: [
        LIST,
        GET,
        INSERT,
        UPDATE,
        DELETE,
        DUPLICATE
     ],
    },
  ],
}
```

![Ag-Grid](https://netcoregenesis.com/images/documentation/doc-table-config.jpg)
