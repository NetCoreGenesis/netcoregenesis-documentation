---
id: Built_in_UI_Components
slug: Built_in_UI_Components
title: Built-in UI Components
sidebar_label: Built-in UI Components
---

> **src/common/typeConfig.ts** -> enum ComponentType

| Component  | Description | Library |
|--|--|--|
| FORM_CONTROL *(Default)* | Text input | [reactstrap](https://reactstrap.github.io/components/form) |
| TOGGLE | On/Off button | [react-toggle](https://www.npmjs.com/package/react-toggle) |
| DATE_PICKER | Date picker without time zone | [react-day-picker](https://react-day-picker.js.org/) |
| DATE_PICKER_TZ | Date picker with time zone | [react-day-picker](https://react-day-picker.js.org/) |
| TIME_PICKER | Time picker with hour and minute | [rc-time-picker](https://react-component.github.io/time-picker/) |
| DROPDOWN | Dropdown or Combobox | [react-select](https://react-select.com/) |
| DROPDOWN_ASYNC | Dropdown with online search capability as you type | [react-select](https://react-select.com/) |
| NUMERIC_INPUT | Number input | [react-number-format](https://www.npmjs.com/package/react-number-format) |
| COLOR_PICKER | Color picker | [react-color](https://casesandberg.github.io/react-color/) |
| MULTIPLE_SELECT | Multiple selectable dropdown | [react-select](https://react-select.com/) |
| MULTIPLE_SELECT_ASYNC | Multiple selectable dropdown with online search capability as you type |[react-select](https://react-select.com/)  |
| PHONE_INPUT | Phone input with country code selectable | [react-intl-tel-input](https://www.npmjs.com/package/react-intl-tel-input) |
| EDITOR | HTML editor | [react-quill](https://github.com/zenoamaro/react-quill) |
| TEXT_AREA | Text area | [reactstrap](https://reactstrap.github.io/components/form) |
| TAG_INPUT | Special multiple addible text input | [react-select](https://react-select.com/) |
| LABEL | Disabled label | [reactstrap](https://reactstrap.github.io/components/form) |
| BAR_CHART | Bar chart |[react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)  |
| LINE_CHART | Line chart | [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) |
| PIE_CHART | Pie chart | [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) |
| JSON_VIEW | JSON input | [react-json-view](https://www.npmjs.com/package/react-json-view) |
| RADIO_BUTTON | Radio button | [reactstrap](https://reactstrap.github.io/components/form) |
| PROGRESS_BAR | Progress bar | [reactstrap](https://reactstrap.github.io/components/progress/) |
| MULTIPLE_PROGRESS_BAR | Multiple progress bar | [reactstrap](https://reactstrap.github.io/components/progress/) |
| TABLE | Table to use for 1-n relations | [ag-grid](https://www.ag-grid.com/), [react-bootstrap-table-next](https://github.com/react-bootstrap-table/react-bootstrap-table2) |
| FILE_UPLOADER | Single file upload | [custom](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag) |
| UPLOAD_CONTAINER | Multiple file upload | [custom](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag) |

## *Customized Prop Types*

These are customized props by our framework to speed up development process. Not all component props will be exists below, please check the original component site for further information.

### **TABLE**

| Property | PropType | Required | Default | Description |
|--|--|--|--|--|
| referredPageConfig | IPageConfig | Yes | - | Page config to use for the table and related features |
| referredTabIndex | number | - | 0 | Tab index in the specified page config |
| customEvents | ITableCustomEvent | - | - |  |
| forceGetRecordFromPageConfig | boolean | - | true |  |
| hideRefreshButton | boolean | - | false |  |
| hideFilters | boolean | - | false |  |
| filterBy | Function | - | - | (params: object, type: ITypeRuntime) |
| refreshButtonProps | object | - | - | ICustomProps & { refreshButtonText?: string } |

### **UPLOAD_CONTAINER**

| Property | PropType | Required | Default | Description |
|--|--|--|--|--|
| accept | string | - | - | see. https://www.w3schools.com/tags/att_input_accept.asp |
| disabled | boolean | - | false | Adding new files not permitted when true |
| onAdd | Function | - | - | (newFile :any) |
| onRemove | Function | - | - | (removedIndex: number) |
| onChange | Function | - | - | (files: any[]) |
| maxFileSize | number | - | 10240 | (KB) Limit for each individual file to be able to uploaded. |

### **FILE_UPLOADER**

| Property | PropType | Required | Default | Description |
|--|--|--|--|--|
| accept | string | - | - | see. https://www.w3schools.com/tags/att_input_accept.asp |
| mode | string | - | - | Default file is an object with mimeType etc. if mode value is "base64" then only this value will be managed.  |
| data | any | - | - | File object or base64 value according to specified mode. |
| onChange | Function | - | - | (file: any) |
| disabled | boolean | - | false | Adding new files not permitted when true. |
| maxFileSize | number | - | 10240 | (KB) Limit for each individual file to be able to uploaded. |
| modalSize | string | - | 'lg' | Preview modal size. |
| style | string | - | - | Styling prop for container element. |
| imageStyle | string | - | - | Styling prop for image preview element. |
