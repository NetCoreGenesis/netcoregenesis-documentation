---
id: JSON_Based_UI_Screen_Rendering
title: JSON-Based UI Screen Rendering
slug: JSON_Based_UI_Screen_Rendering
sidebar_label: JSON-Based UI Screen Rendering
---

If you prefer; there is a simple, human-readable JSON format to render/change UI screens.
> They are all placed in `src/entities` folder.

**src/entities/Management/CompanyTypes.ts**

```js
import TableFormatters from '../../common/TableFormatters';
import { Regexes } from '../../common/validations';
import { IType, ComponentType, Visibility, typeConfigWrapper, CaseStyles, IGroup } from '../../common/typeConfig';
import { ParameterOptionTemplate } from '../../common/typePresets';
import { getLocalizedText } from '../../common/localizationManager';

const { TABLE, FORM, FILTER, BG_FILTER, BG_FORM, FK_FILTER, FK_FORM } = Visibility;

let mainGroup : IGroup = {
    title: getLocalizedText('MAIN_INFO_LABEL'),
    defaultOpen: true
}

let contactGroup : IGroup = {
    title: getLocalizedText('CONTACT_INFO_LABEL'),
    defaultOpen: true
}

let contactPersonGroup : IGroup = {
    title: getLocalizedText('CONTACT_PERSON_INFO_LABEL'),
    defaultOpen: true
}

let otherGroup : IGroup = {
    title: getLocalizedText('OTHER_INFO_LABEL'),
    defaultOpen: true
}

let type: IType = {
    companyId: {
        label: 'companyId',
        isPrimaryId: true,
        typeKey: 'company'
    },
    companyName: {
        label: getLocalizedText('COMPANY_NAME_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: mainGroup,
        visibility: [FORM, TABLE, FILTER],
        forceCaseTo: CaseStyles.ALL_WORDS_CAPITALIZED_CASE,
        valRules: {
            minLength: 3,
            maxLength: 150
        }
    },
    companyLegalTitle: {
        label: getLocalizedText('COMPANY_LEGAL_TITLE_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: mainGroup,
        visibility: [FORM],
        forceCaseTo: CaseStyles.ALL_WORDS_CAPITALIZED_CASE,
        valRules: {
            acceptEmptyStrings: true,
            minLength: 3,
            maxLength: 150
        }
    },
    sectorId: {
        label: getLocalizedText('SECTOR_LABEL'),
        typeInd: ComponentType.DROPDOWN,
        group: mainGroup,
        visibility: [FORM],
        optionConfig: {
          ...ParameterOptionTemplate,
          filterBy: (type, inputText) => ({
            keyCode: 'SECTORS_OPTION'
          }),
        },
    },
    numberOfStaff: {
        label: getLocalizedText('NUMBER_OF_STAFF_LABEL'),
        typeInd: ComponentType.NUMERIC_INPUT,
        group: mainGroup,
        visibility: [FORM],
    },
    contactPerson: {
        label: getLocalizedText('CONTACT_NAME_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: contactPersonGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            minLength: 2,
            maxLength: 75
        }
    },
    contactPersonTitle: {
        label: getLocalizedText('JOB_TITLE_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: contactPersonGroup,
        visibility: [FORM],
        valRules: {
            maxLength: 50
        }
    },
    contactPersonTelephone: {
        label: getLocalizedText('TELEPHONE_LABEL'),
        typeInd: ComponentType.PHONE_INPUT,
        group: contactPersonGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            minLength: 9,
            maxLength: 20
        },
    },
    contactPersonEmail: {
        label: getLocalizedText('EMAIL_LABEL'),
        group: contactPersonGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            regex: Regexes.email,
            customErrMsg: getLocalizedText("ENTER_VALID_EMAIL"),
        },
    },
    email: {
        label: getLocalizedText('EMAIL_LABEL'),
        group: contactGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            regex: Regexes.email,
            customErrMsg: getLocalizedText("ENTER_VALID_EMAIL"),
        },
    },
    website: {
        label: getLocalizedText('WEBSITE_LABEL'),
        group: contactGroup,
        visibility: [FORM],
        placeholder: "http://www.companyname.com",
        valRules: {
            acceptEmptyStrings: true,
            regex: Regexes.webSite,
            customErrMsg: getLocalizedText("ENTER_VALID_WEBSITE"),
        },
    },
    telephone: {
        label: getLocalizedText('TELEPHONE_LABEL'),
        typeInd: ComponentType.PHONE_INPUT,
        group: contactGroup,
        visibility: [FORM, TABLE],
        valRules: {
            acceptEmptyStrings: true,
            minLength: 9,
            maxLength: 20
        },
    },
    countryId: {
      label: getLocalizedText("COUNTRY_LABEL"),
      typeInd: ComponentType.DROPDOWN,
      visibility: [FORM],
      group: contactGroup,
      optionConfig: {
        ...ParameterOptionTemplate,
        filterBy: (type, inputText) => ({
          keyCode: 'COUNTRY'
        }),
      },
      onValueChanged: (value, type, initial, isFilter, that) => {
        if (!isFilter && type.cityId)
          that.dataManagement.fillDropdownData(type.cityId);
        if (isFilter && type.cityId_filter)
          that.dataManagement.fillDropdownData(type.cityId_filter);
      },
    },
    cityId: {
      label: getLocalizedText("CITY_LABEL"),
      typeInd: ComponentType.DROPDOWN,
      visibility: [FORM],
      group: contactGroup,
      optionConfig: {
        ...ParameterOptionTemplate,
        filterBy: (type, inputText) => ({
          keyCode: 'CITY',
          parentValue: type.countryId.value || 0
        }),
      },
      /*filterOptionConfig: {
        ...ParameterOptionTemplate,
        filterBy: (type, inputText) => ({
          keyCode: 'CITY',
          parentValue: type.countryId_filter.value || 0
        }),
      },*/
      onValueChanged: (value, type, initial, isFilter, that) => {
        if (!isFilter && type.townId)
        that.dataManagement.fillDropdownData(type.townId);
        if (isFilter && type.townId_filter)
        that.dataManagement.fillDropdownData(type.townId_filter);
      },
    },
    townId: {
      label: getLocalizedText("TOWN_LABEL"),
      typeInd: ComponentType.DROPDOWN,
      visibility: [FORM],
      group: contactGroup,
      optionConfig: {
        ...ParameterOptionTemplate,
        filterBy: (type, inputText) => ({
          keyCode: 'TOWN',
          parentValue: type.cityId.value || 0
        }),
      },
      /*filterOptionConfig: {
        filterBy: (type, inputText) => ({
          parentValue: type.cityId_filter.value || 0
        }),
      },*/
    },
    address: {
        label: getLocalizedText('ADDRESS_LABEL'),
        typeInd: ComponentType.TEXT_AREA,
        group: contactGroup,
        visibility: [FORM]
    },
    taxOffice: {
        label: getLocalizedText('TAX_OFFICE_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: otherGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            minLength: 2,
            maxLength: 50
        }
    },
    taxNumber: {
        label: getLocalizedText('TAX_NUMBER_LABEL'),
        typeInd: ComponentType.FORM_CONTROL,
        group: otherGroup,
        visibility: [FORM],
        valRules: {
            acceptEmptyStrings: true,
            maxLength: 20
        }
    },
    billingAddress: {
        label: getLocalizedText('BILLING_ADDRESS_LABEL'),
        typeInd: ComponentType.TEXT_AREA,
        group: otherGroup,
        visibility: [FORM]
    },
    note: {
        label: getLocalizedText('NOTE_LABEL'),
        typeInd: ComponentType.TEXT_AREA,
        group: otherGroup,
        visibility: [FORM]
    },
    status: {
        label: getLocalizedText("STATUS_LABEL"),
        typeInd: ComponentType.TOGGLE,
        group: otherGroup,
        visibility: [TABLE, FILTER, FORM],
        defaultValue: 1,
        tableDataFormatter: TableFormatters.toggleFormatter,
    },
}
export default type;
```

> To get familiar with the declarative JSON format, you can practice at **[Demo / Management / Live Preview](https://demo.netcoregenesis.com/livePreview)**
