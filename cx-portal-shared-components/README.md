# Catena-X Portal Shared UI Components

Contains the shared UI components that are used to build the Catena-X Portal Frontend.
Get an overview about the available components here

https://portal.dev.demo.catena-x.net/_storybook/

To use components in your own project follow this guide.
First create a new react app and add dependencies for the library and Material UI.
We are using yarn and TypeScript, if you prefer npm/npx or JavaScript use those.

    yarn create react-app sample-shared-components --template typescript
    yarn add cx-portal-shared-components @mui/icons-material @mui/material


Start the development server

    yarn start


Edit `src/index.tsx` and wrap the `App` with the CX `SharedThemeProvider` context

    ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    ).render(
        <React.StrictMode>
            <SharedThemeProvider>
                <App />
            </SharedThemeProvider>
        </React.StrictMode>
    )


Edit `src/index.css` and add this stylings

    @font-face {
        font-family: "LibreFranklin-SemiBold";
        font-display: block;
        src: url("https://portal.dev.demo.catena-x.net/assets/fonts/LibreFranklin-VariableFont_wght.ttf") format("truetype");
        font-weight: 600;
    }
    @font-face {
        font-family: "LibreFranklin-Medium";
        font-display: block;
        src: url("https://portal.dev.demo.catena-x.net/assets/fonts/LibreFranklin-VariableFont_wght.ttf") format("truetype");
        font-weight: 500;
    }
    @font-face {
        font-family: "LibreFranklin";
        font-display: block;
        src: url("https://portal.dev.demo.catena-x.net/assets/fonts/LibreFranklin-VariableFont_wght.ttf") format("truetype");
        font-weight: 400;
    }
    @font-face {
        font-family: "LibreFranklin-Light";
        font-display: block;
        src: url("https://portal.dev.demo.catena-x.net/assets/fonts/LibreFranklin-VariableFont_wght.ttf") format("truetype");
        font-weight: 300;
    }

    body {
        margin: 0;
        font-family: 'LibreFranklin', 'Libre Franklin', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: black;
        font-weight: 300;
    }


Open `App.tsx` and replace the code with this example

    import { Button } from "cx-portal-shared-components";
    const App = () => <Button onClick={() => { alert('clicked') }}>Click me</Button>
    export default App;

