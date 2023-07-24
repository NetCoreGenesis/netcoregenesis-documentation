## Formatting

### Glob Based (via cli)

- Configure formatting options from `website/.markdownlint.json`.
- Run the following command in `website` directory to all format document files.
  > `npx markdownlint-cli docs/*.md versioned_docs/**/*.md --fix`

### Single file (with linter)

- You can use extension version named `markdownlint`.
- In `Command Palette` choose `Fix all supported markdownlint violations in the document` option.

## Versioning

- Run the following command in "website" directory to add version, the version added should be the version you want to update right now.
- It will automatically copy the documents in the docs folder under the versioned_docs folder.
- If sidebar can be by version, you can look at versioned_sidebars files

- version commad
 `yarn run docusaurus docs:version [YourVersion]`

## Sample

- Current Latest Version = 3.23.0;
- Your New Version = 3.23.1

 `yarn run docusaurus docs:version 3.23.0`

- You can edit version-3.23.1  directly on the "docs" folder. In this case it is the latest version "docs" folder.

## Note

 Don't forget to update the latestVersion value in the  docusaurus.config.js file!
