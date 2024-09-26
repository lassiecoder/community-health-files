#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Create readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query, isMandatory = false) {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(query, (answer) => {
        if (isMandatory && !answer) {
          console.log(
            "\n 🚨 This question is mandatory. Please provide an answer. \n"
          );
          ask(); // Ask again if the answer is empty and the question is mandatory
        } else {
          resolve(answer); // Resolve with the answer, even if it's empty for non-mandatory questions
        }
      });
    };
    ask(); // Start asking
  });
}

// Define folder structure
const githubFolder = path.join(process.cwd(), ".github");
const discussionTemplateFolder = path.join(githubFolder, "DISCUSSION_TEMPLATE");
const issueTemplateFolder = path.join(githubFolder, "ISSUE_TEMPLATE");

const pullRequestTemplate = path.join(githubFolder, "PULL_REQUEST_TEMPLATE.md");
const fundingTemplate = path.join(githubFolder, "FUNDING.yml");
const securityTemplate = path.join(githubFolder, "SECURITY.md");

const docsFolder = path.join(process.cwd(), "docs");
const contributingTemplate = path.join(docsFolder, "CONTRIBUTING.md");
const governanceTemplate = path.join(docsFolder, "GOVERNANCE.md");
const supportTemplate = path.join(docsFolder, "SUPPORT.md");
const codeOfConductTemplate = path.join(docsFolder, "CODE_OF_CONDUCT.md");

const files = {
  // files related to DISCUSSION_TEMPLATE
  announcements: path.join(discussionTemplateFolder, "ANNOUNCEMENTS.yml"),
  ideas: path.join(discussionTemplateFolder, "IDEAS.yml"),

  // files related to ISSUE_TEMPLATE
  bugReport: path.join(issueTemplateFolder, "BUG_REPORT.yml"),
  featureRequest: path.join(issueTemplateFolder, "FEATURE_REQUEST.md"),
  enhancementRequest: path.join(issueTemplateFolder, "ENHANCEMENT_REQUEST.yml"),
  question: path.join(issueTemplateFolder, "QUESTION.md"),
  config: path.join(issueTemplateFolder, "config.yml")
};

// Ensure the necessary folders exist
if (!fs.existsSync(githubFolder)) {
  fs.mkdirSync(githubFolder);
}
if (!fs.existsSync(discussionTemplateFolder)) {
  fs.mkdirSync(discussionTemplateFolder);
}
if (!fs.existsSync(issueTemplateFolder)) {
  fs.mkdirSync(issueTemplateFolder);
}
if (!fs.existsSync(docsFolder)) {
  fs.mkdirSync(docsFolder);
}

// Function to create files with content
async function createFiles() {
  // Message to the user
  console.log("\n==========================================");
  console.log("      [❗] – Questions are mandatory     ");
  console.log("==========================================\n");
  // Get user inputs for templates
  const authorName = await askQuestion(
    "❗ What is the repository owner's name?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const projectLicense = await askQuestion(
    "❗ What is the project license? (e.g., MIT, Apache, GPL):\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const bugAssignee = await askQuestion(
    "❗ Whom would you like to assign the raised bugs to?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const enhancementAssignee = await askQuestion(
    "❗ Who should be assigned the enhancement requests?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const featureAssignee = await askQuestion(
    "❗ To whom would you like to assign the feature requests?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const questionAssignee = await askQuestion(
    "❗ Who will be responsible for addressing questions related to the project?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const orgName = await askQuestion(
    "❗ What is your organization name?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const socialMedia = await askQuestion(
    "❗ What is your social media URL to connect?\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const email = await askQuestion(
    "❗ Please provide the email address for developers and contributors to contact you:\n➜ ",
    true
  );
  console.log("\n·················································· \n");
  const githubUsername = await askQuestion(
    "Please provide the GitHub username(s) for funding (comma separated) or leave blank if none:\n➜ ",
    false
  );
  console.log("\n·················································· \n");
  const patreonUsername = await askQuestion(
    "Enter the Patreon username for funding (leave blank if none):\n➜ ",
    false
  );
  console.log("\n·················································· \n");
  const tideliftPackage = await askQuestion(
    "Enter the Tidelift package name (e.g., npm/package-name) for funding (leave blank if none):\n➜ ",
    false
  );
  console.log("\n·················································· \n");
  const customFunding = await askQuestion(
    "Enter any custom funding URLs (comma separated) or leave blank if none:\n➜ ",
    false
  );

  // Close the readline interface
  rl.close();

  // Process the inputs
  const githubUsers = githubUsername.split(",").map((user) => user.trim());
  const customUrls = customFunding.split(",").map((url) => url.trim());

  // Content for announcements.yml
  const announcementsContent = `title: "[General] "
labels: ["General Introduction"]
body:
  - type: markdown
    attributes:
      value: |
        introduce yourself!
  - type: textarea
    id: improvements
    attributes:
      label: Top 3 improvements
      description: "What are the top 3 improvements we could make to this project?"
      value: |
        1.
        2.
        3.
        ...
      render: bash
    validations:
      required: true
  - type: markdown
    attributes:
      value: |
        ## How to connect
        here are few connection way 
  - type: input
    id: has-id
    attributes:
      label: Suggestions
      description: A description about suggestions to help you
    validations:
      required: true
  - type: dropdown
    id: download
    attributes:
      label: Which area of this project could be most improved?
      options:
        - Documentation
        - Pull request review time
        - Bug fix time
        - Release cadence
    validations:
      required: true
  - type: checkboxes
    attributes:
      label: Check that box!
      options:
        - label: This one!
          required: true
        - label: I won't stop you if you check this one, too
  - type: markdown
    attributes:
      value: |
        ### The thrilling conclusion
        _to our template_
`;

  // Content for announcements.yml
  const ideasContent = `title: "[Ideas] "
labels: ["Share your Idea"]
body:
  - type: textarea
    id: idea
    attributes:
      label: Idea highlight
      description: "What are the idea we could make to this project?"
      value:
      render: bash
    validations:
      required: true

  - type: dropdown
    id: improvement
    attributes:
      label: Which area of this project could be most improved?
      options:
        - Documentation
        - Pull request review time
        - Bug fix time
        - Release cadence
    validations:
      required: true

  - type: input
    id: id
    attributes:
      label: email
      description: your contact number
    validations:
      required: false

  - type: checkboxes
    attributes:
      label: Check that box!
      options:
        - label: Read Code of conduct!
          required: true
        - label: I won't stop you if you check this one, too

  - type: markdown
    attributes:
      value: |
        ### Thanks
        _we will contact you_ **soon**
`;

  // Content for BUG_REPORT.yml
  const bugReportContent = `name: Bug Report
description: File a bug report to help us improve.
title: "[🐛]:"
labels: ["bug", "invalid"]
projects: ["abcdkbd"]
assignees:
  - "${bugAssignee}"

body:
  - type: textarea
    id: problem
    attributes:
      label: What happened?
      description: |
        Please provide as much info as possible.
      placeholder: Tell us what you see!
      value: A bug happened
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: What did you expect to happen?
      description: |
        Please provide expected result/output.
      placeholder: Tell us what is expected !
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Anything else we need to know?
      description: |
        Please provide other details if it is necessary.
      placeholder: Software version and device details!
    validations:
      required: false

  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
        - Other

  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
    validations:
      required: false

  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false

  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our Code of Conduct
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
`;

  // Content for FEATURE_REQUEST.md
  const featureRequestContent = `---
name: Feature request
about: "Suggest a feature for this project"
title: [❇️]
labels: ["enhancement"]
assignees: ["${featureAssignee}"]
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
`;

  // Content for ENHANCEMENT_REQUEST.yml
  const enhancementRequestContent = `name: Enhancement Tracking Issue
description: Provide supporting details for a feature in development
title: "[🪡]:"
labels: [enhancement]
assignees:
  - "${enhancementAssignee}"
body:
  - type: textarea
    id: feature
    attributes:
      label: What would you like to be added?
      description: |
        Feature requests are unlikely to make progress as issues.
    validations:
      required: true

  - type: textarea
    id: rationale
    attributes:
      label: Why is this needed?
    validations:
      required: true
`;

  // Content for QUESTION.md
  const questionContent = `---
name: Question
about: Use this template to ask a question about the project
title: ❓
labels: question
assignees: ${questionAssignee}
---

## Question

State your question

## Sample Code

Please include relevant code snippets or files that provide context for your question.
`;

  // Content for config.yml
  const configContent = `blank_issues_enabled: false
contact_links:
  - name: GitHub Community Support
    url: https://github.com/orgs/community/discussions
    about: Please ask and answer questions here.
  - name: "${orgName}"
    url: "${socialMedia}"
    about: "WRITE_ABOUT_YOUR_ORGANIZATION"
`;

  // Content for PULL_REQUEST_TEMPLATE.md
  const pullRequestTemplateContent = `# Pull Request Template

## Description

Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change.

Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

- [ ] Test A
- [ ] Test B

**Test Configuration**:

- Browser:
- Device:
- Toolchain:

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
- [ ] I have checked my code and corrected any misspellings
`;

  // Content for FUNDING.yml
  const fundingTemplateContent = `
github: [${githubUsers.join(", ")}]
patreon: ${patreonUsername}
tidelift: ${tideliftPackage}
custom: ${JSON.stringify(customUrls)}
`;

  // Content for SECURITY.md
  const securityTemplateContent = `# Security Policy

## Scope

Keeping users safe and secure is a top priority for us.We welcome the contribution of external security researchers.

If you believe you’ve found a security or vulnerability issue in the repo we encourage you to notify us.

There are no hard and fast rules to determine if a bug is worth reporting as a security issue or a “regular” issue.
When in doubt, please do send us a report.

## How to submit a report

Security issues can be reported by sending an email us to [${email}](mailto:${email}).

The team will acknowledge your email within 48 hours. You will receive a more detailed response within 96 hours.

We will create a maintainer security advisory on GitHub to discuss internally, and when needed, invite you to the advisory.

## Purpose

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission of the account holder. If you do encounter Personally Identifiable Information (PII) contact us immediately,
  do not proceed with access, and immediately purge any local information
- Provide us with a reasonable amount of time to resolve vulnerabilities prior to any disclosure to the public or a third-party
- We will consider activities conducted consistent with this policy to constitute “authorized” conduct and will not pursue civil action or initiate a complaint to law enforcement.
  We will help to the extent we can if legal action is initiated by a third party against you

Please submit a report to us before engaging in conduct that may be inconsistent with or unaddressed by this policy.

## Preferences

- Please provide detailed reports with reproducible steps and a clearly defined impact
- Submit one vulnerability per report
- Social engineering (such as phishing, vishing, smishing) is prohibited
`;

  // Content for CONTRIBUTING.md
  const contributingTemplateContent = `# Contributing

This article explains how to contribute to the project. Please read through the following guidelines.

Write something nice and instructive as an intro. Talk about what kind of contributions you are interested in.

> Welcome! We love receiving contributions from our community, so thanks for stopping by! There are many ways to contribute, including submitting bug reports, improving documentation, submitting feature requests, reviewing new submissions, or contributing code that can be incorporated into the project.

## Summary

> [!Note]  
> Before participating in our community, please read our [Code Of Conduct][coc].  
> By interacting with this repository, organization, or community you agree to abide by its terms.

This document describes our development process. Following these guidelines shows that you respect the time and effort of the developers managing this project. In return, you will be shown respect in addressing your issue, reviewing your changes, and incorporating your contributions.

## Contributions

There are several ways to contribute, not just by writing code. If you have questions, see [support][support].

### Financial support

It's possible to support us financially by becoming a backer or sponsor through [Sponsor platform name][sponsor_platform] platforms.

### Improve docs

As a user, you’re perfect for helping us improve our docs. Typo corrections, error fixes, better explanations, new examples, etc.

### Improve issues

Some issues lack information, aren’t reproducible, or are just incorrect. You can help by trying to make them easier to resolve. Existing issues might benefit from your unique experience or opinions.

### Write code

Code contributions are very welcome.  
It’s probably a good idea to first post a question or open an issue to report a bug or suggest a new feature before creating a pull request.

## Submitting an issue

- The issue tracker is for issues. Use discussions for support.
- Search the issue tracker (including closed issues) before opening a new issue.
- Ensure you’re using the latest version of our packages.
- Use a clear and descriptive title.
- Include as much information as possible: steps to reproduce the issue, error message, version, operating system, etc.
- The more time you put into an issue, the better we will be able to help you.
- The best issue report is a proper reproduction step to prove it.

## Development Process

What is your development process?

> [!Tip]  
> This project follows the basic git flow.

Check and follow the [README][readme] file and run the project on your local environment.

Talk about branches people should work on. Specifically, where is the starting point? \`main\`, \`feature\`, \`hotfix\`, \`task\`, etc.

### Testing

If you add code, you need to add tests! We’ve learned the hard way that code without tests is undependable. If your pull request reduces our test coverage because it lacks tests, it will be rejected.

Provide instructions for adding new tests. Provide instructions for running tests.

\`\`\`sh
npm run test
\`\`\`

### Style Guidelines

Run the command below:

\`\`\`sh
npm run lint
\`\`\`

### Code Formatting

Use a code formatter in your IDE, and add Prettier and other useful extensions in your IDE.

### Git Commit Guidelines

Below are the guidelines for your commit messages.

- Add a clear message and keep it within 50 characters.
- Prefix the message with a feature or issue number from the issue page.

### Submitting a pull request

- Run \`npm test\` locally to build, format, and test your changes.
- Non-trivial changes are often best discussed in an issue first to prevent unnecessary work.
- For ambitious tasks, get your work in front of the community for feedback as soon as possible.
- New features should be accompanied by tests and documentation.
- Don’t include unrelated changes.
- Test before submitting code by running \`npm test\`.
- Write a convincing description of why we should land your pull request: it’s your job to convince us.

## Pull Request Process

When you are ready to generate a pull request, either for preliminary review or for consideration of merging into the project, you must first push your local topic branch back up to GitHub:

\`\`\`sh
git push origin feature/branch-name
\`\`\`

### Submitting the PR

Once you've committed and pushed all of your changes to GitHub, go to the page for your fork on GitHub, select your development branch, and click the pull request button.  
If you need to make any adjustments to your pull request, just push the updates to your branch. Your pull request will automatically track the changes on your development branch and update.

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the \`README.md\` with details of changes to the interface. This includes new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any example files and the \`README.md\` to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request once you have the sign-off of two other developers. If you don’t have permission to do that, request the second reviewer to merge it for you.

### Review Process

The core team reviews Pull Requests regularly in a weekly triage meeting held in a public domain. The schedule is announced in weekly status updates.  
Our Reviewer will provide constructive feedback by writing Review Comments (RC). The Pull Requester must address all RC in time.

After feedback has been given, we expect responses within two weeks. If no activity is shown within this time, we may close the pull request.  
For larger commits, we prefer a +1 from someone on the core team or another contributor. Please note if you reviewed the code or tested locally.

### Addressing Feedback

Once a PR has been submitted, your changes will be reviewed, and constructive feedback may be provided. Feedback is not meant as an attack but helps ensure high-quality code. Changes will be approved once required feedback has been addressed.

If a maintainer asks you to "rebase" your PR, that means a lot of code has changed, and you need to update your fork to make merging easier.

To update your forked repository, follow these steps:

### Fetch upstream master and merge with your repo's main branch

\`\`\`sh
git fetch upstream
git checkout main
git merge upstream/main
\`\`\`

#### If there were any new commits, rebase your development branch

\`\`\`sh
git checkout feature/branch-name
git rebase main
\`\`\`

If too much code has changed, you may need to resolve merge conflicts manually.

Once your new branch has no conflicts and works correctly, override your old branch using this command:

\`\`\`sh
git push origin feature/branch-name
\`\`\`

## Community

We have a mailing list, Slack channel, and IRC channel. Links are provided below:

- You can help answer questions our users have here:
- You can help build and design our website here:
- You can help write blog posts about the project by:
- You can help with newsletters and internal communications by:

## Resources

- [How to contribute to open source](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Making your first contribution](https://www.freecodecamp.org/news/how-to-make-your-first-open-source-contribution/)
- [Using pull requests](https://docs.github.com/en/pull-requests)
- [GitHub help](https://help.github.com)
- [Commit message guidelines](https://github.com/joelparkerhenderson/git-commit-message), [Commit guidelines](https://medium.com/@sharmapriyanka84510/commit-guidelines-f41b23f0bf4a)

## License

${projectLicense}

## Author

© ${authorName}

<!-- contributingTemplateContent Definitions -->

[sponsor_platform]: https://github.com
[author]: https://github.com
[readme]: https://github.com
[support]: https://github.com
[coc]: https://github.com
`;

  // Content for GOVERNANCE.md
  const governanceTemplateContent = `# Governance

To ensure clarity and transparency in our project's management, we encourage you to add a **GOVERNANCE** section. This file should outline how decisions are made, detail the roles within the project, and provide guidance on the governance structure. It can include information about:

- **Project Roles**: Define the responsibilities of contributors, maintainers, and other key participants.
- **Decision-Making Process**: Explain how decisions are made regarding features, bug fixes, and other significant changes to the project.
- **Community Involvement**: Describe how community members can engage in discussions and contribute to the decision-making process.

By clearly outlining these aspects, you can foster a more inclusive environment where contributors feel valued and informed.
`;

  // Content for SUPPORT.md
  const supportTemplateContent = `# Support

This article explains where to get help with remark.
Please read through the following guidelines.

> [!Note]
> before participating in our community, please read our [code of conduct][coc].
> By interacting with this repository, organization, or community you agree to abide by its terms.

## Asking quality questions

Questions can go to [GitHub discussions][dicussion].

Help us help you!

Spend time framing questions and add links and resources.  
Spending the extra time up front can help save everyone time in the long run.

> [!Tip]
> Here are some tips

- [Talk to us][chat]!
- Don’t fall for the [XY problem][xy]
- Search to find out if a similar question has been asked
- Try to define what you need help with:
  - Is there something in particular you want to do?
  - What problem are you encountering and what steps have you taken to try and fix it?
  - Is there a concept you don’t understand?
- Provide sample code, such as a [CodeSandbox][cs] or [StackBlitz][sb] or a small video, if possible
- Screenshots can help, but if there’s important text such as code or error messages in them, please also provide those as text
- The more time you put into asking your question, the better we can help you

## Contributions

See [\`contributing.md\`][contributing] on how to contribute.

## License

© ${authorName}

<!-- Definitions -->

[author]: https://github.com
[coc]: https://github.com
[chat]: https://github.com
[dicussion]: https://github.com
[contributing]: https://github.com
[xy]: https://xyproblem.info
[cs]: https://codesandbox.io
[sb]: https://stackblitz.com
`;

  // Content for CODE_OF_CONDUCT.md
  const codeOfConductTemplateContent = `# Contributor Covenant Code of Conduct

**Table of Contents:**

- [Contributor Covenant Code of Conduct](#contributor-covenant-code-of-conduct)
  - [Summary](#summary)
  - [Our Pledge](#our-pledge)
  - [Our Standards](#our-standards)
  - [Enforcement Responsibilities](#enforcement-responsibilities)
  - [Scope](#scope)
  - [Enforcement](#enforcement)
  - [Enforcement Guidelines](#enforcement-guidelines)
    - [1. Correction](#1-correction)
    - [2. Warning](#2-warning)
    - [3. Temporary Ban](#3-temporary-ban)
    - [4. Permanent Ban](#4-permanent-ban)
  - [Attribution](#attribution)

**Version**: 1.0.0

## Summary

As contributors and maintainers of this projects, we will respect everyone who contributes by posting issues, updating documentation, submitting pull requests, providing feedback in comments, and any other activities.

Communication regarding the projects through any channel must be constructive and never resort to personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct. Courtesy and respect shall be extended to everyone involved in this project. Our experiences as individuals differs widely, and as such contributors are expected to be respectful of differing viewpoints and ideas.

We expect all contributors to uphold our standards of conduct. If any member of the community violates this code of conduct, the Embedded Artistry team and project maintainers will take action. We reserve the right to remove issues, comments, and PRs that do not comply with our conduct standards. Repeated or significant offenses will result in blocked accounts and disassociation with our projects and the Embedded Artistry community.

If you are subject to or witness unacceptable behavior, or have any other concerns, please email us at [${email}](mailto:${email}).

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [_this email_][contact]. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

## Enforcement Guidelines

> [!CAUTION]
> Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.0, available at <https://www.contributor-covenant.org/version/2/0/code_of_conduct.html>.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).


For answers to common questions about this code of conduct see the FAQ at <https://www.contributor-covenant.org/faq>. Translations are available at <https://www.contributor-covenant.org/translations>.

[homepage]: https://www.contributor-covenant.org
[contact]: mailto:${email}
`;

  // Write content to files
  fs.writeFileSync(files.announcements, announcementsContent);
  fs.writeFileSync(files.ideas, ideasContent);

  fs.writeFileSync(files.bugReport, bugReportContent);
  fs.writeFileSync(files.featureRequest, featureRequestContent);
  fs.writeFileSync(files.enhancementRequest, enhancementRequestContent);
  fs.writeFileSync(files.question, questionContent);
  fs.writeFileSync(files.config, configContent);

  fs.writeFileSync(pullRequestTemplate, pullRequestTemplateContent);
  fs.writeFileSync(fundingTemplate, fundingTemplateContent);
  fs.writeFileSync(securityTemplate, securityTemplateContent);

  fs.writeFileSync(contributingTemplate, contributingTemplateContent);
  fs.writeFileSync(governanceTemplate, governanceTemplateContent);
  fs.writeFileSync(supportTemplate, supportTemplateContent);
  fs.writeFileSync(codeOfConductTemplate, codeOfConductTemplateContent);

  const repoLink = "https://github.com";

  console.log(
    "\n⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆"
  );
  console.log("\n");
  console.log("Community health files setup has been done successfully! ✅");
  console.log("\n");
  console.log(
    `If you appreciate my efforts, please consider supporting me by ⭐ my repository on GitHub: ${repoLink}`
  );
  console.log("\n");
  console.log(
    "⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆⋆⋅☆⋅⋆\n"
  );
}

// Execute file creation
createFiles().catch((err) => console.error(err));
