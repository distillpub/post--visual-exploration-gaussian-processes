## Development

To install all the dependencies:

    npm install

The project supports live reloading with:

    npm run serve

To deploy the project to the `docs` folder:

    npm run build
    npm run deploy

## Important

There are some things that need to be considered when working on the document:

* The `.bib` file needs to be free of JabRef `@Comment` tags, otherwise the bibliography will not work.
