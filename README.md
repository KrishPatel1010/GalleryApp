# GalleryApp

This is a React Native mobile application for displaying a gallery of images.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js, npm, and Expo CLI installed globally:

```bash
npm install -g expo-cli
```

### Installation

1. Clone the repository (if applicable):
   ```bash
   git clone <repository-url>
   cd GalleryApp
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Running the App

To run the app in development mode, use Expo CLI:

1. Start the Metro bundler:
   ```bash
   npm start
   ```

2. Once the Metro bundler is running, you will see a QR code in your terminal. You can:
   - **Scan the QR code** with the Expo Go app on your physical device (Android or iOS).
   - Press `a` to open the app in an Android emulator.
   - Press `i` to open the app in an iOS simulator (macOS only).
   - Press `w` to open the app in a web browser.

## Project Structure

- `App.js`: Main application component, sets up navigation.
- `HomeScreen.js`: Displays the image gallery.
- `assets/`: Contains application assets like icons and splash screens.
- `package.json`: Project metadata and dependencies.

## Dependencies

Key dependencies used in this project:
- `@react-navigation/native`
- `@react-navigation/drawer`
- `react-native-reanimated`
- `@react-native-async-storage/async-storage`
- `expo`
- `react`
- `react-native`
- `react-native-gesture-handler`
