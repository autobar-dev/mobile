# Autobar Mobile

Mobile is the Android/iOS mobile app for Autobar written in React Native.

## Setup

### Installable Bundles

GitHub Actions have been set up in such a way, that whenever you merge requests into `develop` or `main`, an APK file will be built for that version of the app. The ones you'll find on `develop` are testing builds and the ones on `main` are production builds.

### Production

To run what has been deployed to production clone the `main` branch and run it as described in the **Running** section.

```
git clone --branch main https://github.com/autobar-dev/mobile.git

npm install # INSTALL ALL DEPENDENCIES
```

### Development

All features available on the testing environment and not yet deployed to production are on the `develop` branch.

```
git clone --branch develop https://github.com/autobar-dev/mobile.git
```

or, if you have already cloned the repo, simply run `git checkout develop`.

**Important:** before you start the app, remember to install all dependencies:

```
npm install
```

## Running

### Production

On production you will most likely want to deploy the app to Google Play Store or Apple App Store, but for now that has to be done manually. Then you can simply install it from one of those providers.

### Development

First of all, you will need to start the Metro Bundler. Go to the root of the project and run:

```
npm start
```

Then, to run the app on a connected Android device or an emulator:

```
npm run android
```