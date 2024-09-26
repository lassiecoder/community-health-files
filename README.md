# Project Documentation

## Introduction

The `community-health-files` package is designed to automate the creation and management of essential files like `CODE_OF_CONDUCT.md`, `BUG_REPORT.yml`, and `SECURITY.md` for open-source projects.

This package is designed to offer a streamlined and efficient workflow for managing community health files, such as contributing guidelines, security policies, and codes of conduct, in a structured and easily accessible manner.

This documentation will guide you through the process of setting up, configuring, and using the project effectively. We encourage contributions from the community, whether it's through code, documentation improvements, or sharing ideas.

---

## Features

- **Community Health Files**: Automatically sets up essential files like `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `BUG_REPORT.yml`.
- **Customizable Security Policy**: Allows you to define a contact/email for reporting security vulnerabilities.
- **Easy Configuration**: The setup process is streamlined, with a few steps for customization.
- **Flexible**: You can adjust, extend, or update the policies to meet your project's specific needs.

---

## Installation

Run the setup script and provide the necessary details when prompted.

```bash
npx community-health-files
```

### Prerequisites

Before installing, ensure you have the following software installed on your machine:

- **Node.js** (>= 14.x.x)
- **npm** (>= 6.x.x)

---

## Configuration / Customization

### CONTRIBUTING.md file

1. Update the URLs here according to your organization or specific use case:

   ```bash
   <!-- Definitions -->

   [sponsor_platform]: https://github.com
   [author]: https://github.com
   [readme]: https://github.com
   [support]: https://github.com
   [coc]: https://github.com
   ```

2. Additionally, update the text _`"Sponsor platform name"`_ to reflect the name of the specific sponsor platform you will be mentioning.

📝 _Note: You can find both of it on the path `docs/CONTRIBUTING.md`_

### Customizing config.yml file

Please provide a description of your organization in place of `"WRITE_ABOUT_YOUR_ORGANIZATION"`.

📝 _Note: The path to `config.yml` is `.github/ISSUE_TEMPLATE/config.yml`._

### Code of Conduct

You can edit the _`CODE_OF_CONDUCT.md`_ file to tailor the rules of behavior and enforcement guidelines for your project's community. The default code of conduct is based on a **standard template** but can be customized to fit your specific requirements.

### SUPPORT.md

Update the URLs here according to your organization or specific use case:

```bash
<!-- Definitions -->

[author]: https://github.com
[coc]: https://github.com
[chat]: https://github.com
[dicussion]: https://github.com
[contributing]: https://github.com
[xy]: https://xyproblem.info
[cs]: https://codesandbox.io
[sb]: https://stackblitz.com
```

_Note: The path to `SUPPORT.md` is `docs/SUPPORT.md`._

### Updating the FUNDING.yml File

If you chose to skip the funding options during the installation process, you can still add or update the funding information in the _`.github/FUNDING.yml`_ file later. Here’s how to do it:

1. Navigate to the _`.github/FUNDING.yml`_ in your project.

2. **Format your funding information**:

   - Use the following format to specify your funding sources:

   ```yaml
   github: [username1, username2]
   patreon: username
   tidelift: package/name
   custom: ["https://link1.com", "https://link2.com"]
   ```

   - Replace the placeholders with your actual funding information:
     - `github`: List your GitHub sponsors' usernames in square brackets, separated by commas.
     - `patreon`: Enter your Patreon username.
     - `tidelift`: Specify your Tidelift package.
     - `custom`: Include any additional funding links you wish to add in an array format.

3. **Example**:

   Here’s an example of how the file may look after editing:

   ```yaml
   github: [octocat, surftocat]
   patreon: octocat
   tidelift: npm/octo-package
   custom: ["https://www.paypal.me/octocat", "https://octocat.com"]
   ```

   By following these steps, you can ensure that your funding options are up to date and easily accessible to your project's supporters.

---

## ✨ Support my work ✨

If you find this package helpful, please consider supporting me by **[adding a star ⭐ to the repository](https://github.com/your-username/your-repo-name)**. Your support helps me improve and continue providing valuable open-source software.

Thank you! :)
