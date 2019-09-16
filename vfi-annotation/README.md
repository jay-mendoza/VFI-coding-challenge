# VfiAnnotation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Serve

Run `ng serve --open` to run it in browser.<br />
Navigate to `http://localhost:4200/` if it did not automatically open it.

## Dependencies

### Angular Material

This project uses [Angular Material](https://material.angular.io/) for theming.<br />
Please run `ng add @angular/material` if it is looking for this dependency.

### Crypto-JS

This project also uses [crypto-js](https://code.google.com/archive/p/crypto-js/) for cryptography and hashing functions.

## How to Use App

### Sign in or register

Sign In as the build in `admin` account with password `password`.<br />
OR register to create a new account.<br />
<br />
Do do either of these, click on the links at the right side of the header.

### Sign in or register

Once Signed In, user can change password or sign out.<br />
Do do either of these, click on the "person" icon at the right side of the header.

### Annotate

To annotate, the user must first be signed in. (limitation #1)<br />
<br />
To create an annotation, click on a word, or highlight a string of words.<br />
<br />
Note: Limitation #2: User can only annotate words that are not annotated yet.<br />
Currently, you could try, but it may not work as expected.<br />
<br />
The user can annotate any words that are not annotated yet.<br />
A user can edit ONLY annotations that are made by the same user.<br />
A user can delete ONLY annotations that are made by the same user.
<br />

### Annotate: Comment

1. Click on word/words to open the Annotation dialog.<br />
2. Edit the `Annotation/Comment` text field.<br />
3. Click `Save`<br />
<br />
Note: You can resize the comment text field. Simple drag the lower right handle of the field.

### Annotate: Tags!

1. Click on word/words to open the Annotation dialog.<br />
2. Click on the field that says `Type of pick a tag`.<br />
3. Pick from the drop-down, or type a tag. Press either a comma or enter to finish a tag.<br />
4. To remove a tag, simply click on the `X` button to the right of the tag.<br />
5. Click `Save`

### TAG filtering

To filter by tags, simply click on a tag at the bottom of te page.

### Reset Database

To reset the users database, navigate to `{domain}/resetusers`.<br />
To reset the articles database, navigate to `{domain}/resetarticles`.

## Apps used in development

All apps used are open-source / freeware.

### Visual Studio Code

Code editor. <br />
<br />
Download link: [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)<br />
GitHub source code: [microsoft/vscode](https://github.com/microsoft/vscode).

### Chrome

Browser for testing and running. Also used for debugging (F12 Dev Tools).<br />
<br />
Download link: [Google Chrome - The New Chrome & Most Secure Web Browser](https://www.google.com/chrome/)

### GitHub Desktop

Git management IDE.<br />
<br />
Download link: [GitHub Desktop | Simple collaboration from your desktop](https://desktop.github.com/)<br />
Github source code: [desktop/desktop](https://github.com/desktop/desktop). Used to manage git functions.<br />
