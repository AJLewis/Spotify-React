# spotify-mendix-widget
Spotify widget built in React 18 for a technical test with Mendix

## Set up instructions

The below instruction assume node has been installed on the machine. If this is not the case please head to <https://nodejs.org/en/download/> to download it.

1) Take a close of the repo by navigating to your desired local directory and run the command 'git clone https://... {get link from green 'Code' button above}'
2) Once cloned, run the 'npm install' command to download the required dependencies.
3) When this is complete you need to run the application using the command 'npm run start'. This will spin up a server on <http://localhost:3000>
4) Navigation to the URL above and you're all set.

### Implementation ###
The application is built using React 18 and Visual Studio Code IDE.

There is a dependency on dotenv which is used to store the API links.

Playlists are not dynamic, the id's are simply stored in an array. Ideally I would have implemented a database to store these with a UI element to run CRUD operations and allow the user to update the list themselves.

Below is a link to a Figma file which contains some designs I created for this widget.
<https://www.figma.com/file/LzAv7tXUXfQtdKLUD82Zwj/Audio-Player-Widget-Designs?node-id=0%3A1>
