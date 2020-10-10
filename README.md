# Safe Cracker v 1.0.0
# Author : Thuan Tran (thuanttqq@gmail.com)

HTML 5 Project with Pixi, Phaser 3, Webpack, Use Typescript for coding

## Setup

`npm install`

<b>Run the dev server</b>

`npm run server:dev`

<b>Development build</b>

`npm run build:dev`

This will build the game with a few caveats;
- A compile time flag, DEBUG, set to true; allowing you to include or not include certain code depending on if it's DEBUG build or not.
- The resulting game.js will not be minified

<b>Production build</b>

`npm run build:dist`

This will build the game with a few caveats;
- The compile time flag, DEBUG, set to false; allowing you to include or not include certain code depending on if it's DEBUG build or not.
- The resulting game.min.js will be minified

## Generate Assets Class:

Drop your assets in assets/ (subdirectories do not matter) and run (you need to run this manually if you change assets while the server is running, otherwise it's run automatically when running a build);

`npm run assets`

or (if your dev GOOGLE_WEB_FONTS is different from your dist);

`npm run assets:dev`

src/assets.ts will be generated which contains sections for all asset types and classes for every asset, it will also generate an enum containing every frame and sprite in Atlases and AudioSprites respectively

## Change the game size and generate a template background:

`npm run setupGameSize`

`npm run setupGameSize -- -h`

`npm run setupGameSize -- --width [width] --height [height] --scale-mode [one of the Phaser Scale Modes]`
