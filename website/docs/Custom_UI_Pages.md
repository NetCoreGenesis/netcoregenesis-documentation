---
id: Custom_UI_Pages
slug: Custom_UI_Pages
title: Custom UI Pages
sidebar_label: Custom UI Pages
---

Besides JSON-based pages, you can create custom (pure React JS) or hybrid (JSON + React JS) pages.

a) For a _simple hybrid_ example, check **Parameters** page
- views/routes/Management/Parameters/ParametersPageConfig.tsx
- views/routes/Management/Parameters/customTranslationRender.js
- entities/Management/ParameterType.ts

b) For a _complex hybrid_ example, check **Departments** page
- views/routes/Management/Department/Department.js
- entities/Management/Department.ts

c) For a simple ReactJS example, check **Dashboard** page
- views/routes/Management/Dashboard/Dashboard.js

> Also check Register, ChangePassword, ForgotPassword, ResetPasword.
