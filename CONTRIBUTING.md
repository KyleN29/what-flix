# Contributing

## Getting Started

### Step 1: Install Node and npm

Go to https://nodejs.org/en/download and run the installer.

Verify installed correctly by running `node -v` and `npm -v`

### Step 2: Clone and enter the repository

`git clone https://github.com/KyleN29/what-flix.git` `cd what-flix`

### Step 3: Installing dependencies

To install all necessary dependencies, run: `npm run install-all`

### Step 4: Running the environment

The frontend and backend need to be run separately in development.

In separate terminals, run the following commands in the root directory.

Frontend: `npm run frontend`

Backend: `npm run backend`

### Step 5: Making changes

No changes should be directly added to main. All changes should be made in a
separate branch and then merged with a pull request.

To create a branch run `git checkout -b <type>/<name>`.

Type should describe the type of change your branch will make. The type should
be feature, style, fixes, or refactor. The name should be a short title to
describe the branch.

Example: `git checkout -b feature/project-skeleton`

### Step 6: Staging your changes for commit

After making changes, add to your current commit.
Add a specific file: `git add <filename>`
Add all changed files: `git add .`
Add all modified files: `git add -u`

Run `git status` to ensure you are making the correct changes and are in the
correct branch. Then commit with a message describing your changes.
`git commit -m <your-message>`

Example: `git commit -m "Added navbar.tsx component to home.tsx"`

### Step 7: Pushing your changes

After finalizing your commit, you need to push your changes to your branch.
If you had just created the branch, you'll need to publish it first.
New branch: `git push -u origin <branch-name>`
Existing branch: `git push`

Once you are finished pushing your changes, you should create a pull
request to merge with main.
