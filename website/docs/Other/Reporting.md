---
id: Reporting
slug: Reporting
title: Reporting
sidebar_label: Reporting
---

Net Core Genesis does not provide a reporting tool by default.

But, for your flexible reporting needs, [FastReport](https://www.fast-report.com/en/blog/show/use-WebReport-with-ASP-Net-Core/) seems appropriate and can be suggested in terms of offering an open source version.

The core is the engine of the report generator that allows you to create:

### Reporting from code

thanks to FastReport's public library methods, you can easily create reporting objects and change their nature. In this way, you can create a complete report without a report designer. However, this needs to be understood on the basis of reporting principles;

### Multi-page report

as the template is filled with data, the report is divided into pages. But you can create multiple templates - pages in a report. So you create essentially several reports within one;

### Web reports

web reports are supported. Depending on the target platform, it can be a solution for ASP.Net (Core) or a Report Server for VCL. You will be able to view reports in a browser, go to the press and to perform exports in the available formats. In addition, it is possible to distinguish between access to reports on a report server (for VCL);

### Inheritance

a mechanism that allows you to use a basic template in many reports. Thus, we can minimize the work of creating the same type of reports or reports with a corporate title;

### Cross-table

the ability to use spreadsheets - a popular tool for data analysis
Interactive reports - reports that respond to user actions. For example, clicking on the item will result in appearance of detailing the table or hiding / opening list;

### Subreports

the ability to embed one report to another. In fact, when placing an object Subreport on the page, it creates a pattern on a separate page. Number subreports are not limited to;

### Export

option to convert the report to one of the many popular formats:
- Adobe Acrobat (PDF);
- Rich Text;
- HTML;
- MHT;
- XML;
- Excel 2007;
- Excel 97;
- Microsoft Word 2007;
- Microsoft PowerPoint 2007;
- OpenOffice Calc;
- OpenOffice Writer;
- Microsoft XPS;
- CSV;
- DBF;
- Text;
- ZPL;
- Image (Jpeg, PNG, BMP, GIFF, TIFF, Windows metafile);
- XAML;
- SVG;
- PPML;
- PostScript;
- Json;
- LaTeX.

### Sending by Email

the ability to send the report by email

## Report designer

### Interface

a modern Ribbon interface is convenient for easy access to controls. This type of interface is used in Microsoft Office since 2007;

### Ability to embed in an application

report designer made a separate program (library) that allows you to run it on its own, or to include in your custom application;

### Preview mode

in the Report Designer, you can view reports in built form. This mode also allows you to export the report, print, send email;

### Master

there are a lot of masters available in the designer, which accelerate the process of creating the report. For example, a new report wizard allows only a few steps to create the finished sample report with a data connection. A wizard for creating a data source - creates a connection to the database, and in a few clicks;

### Plug-ins

the abilities of the report designer can be extended with plugins. Basically these are plugin - connectors for quick connection to the data source, but there are also plug-ins that add new objects to be placed in the report.

> For more, visit https://www.fast-report.com/en/product/fast-report-net/
