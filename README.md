# Bridge - React Native Chat Application

A cross-platform real-time messaging application built with React Native. Bridge enables users to authenticate, connect with other users, and communicate seamlessly across iOS and Android platforms.

## Features

- **User Authentication**: Secure login and signup with email/password
- **Real-Time Messaging**: Send and receive messages instantly
- **User Discovery**: Browse and connect with other users
- **User Management**: View and manage user profiles
- **Responsive UI**: Beautiful and intuitive interface with custom components
- **State Management**: Centralized auth context for user sessions
- **Cross-Platform**: Runs on both iOS and Android

## Project Structure

```
bridge/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   │   ├── ChatInput.js      # Message input component
│   │   ├── Loader.js         # Loading spinner
│   │   ├── MessageBubble.js  # Message display component
│   │   └── UserItem.js       # User list item
│   ├── context/         # Global state management
│   │   └── AuthContext.js    # Authentication context
│   ├── hooks/           # Custom React hooks
│   │   └── useAuth.js        # Auth hook
│   ├── navigation/      # Navigation stack configuration
│   │   ├── AppNavigator.js   # Main app navigation
│   │   ├── AuthNavigator.js  # Auth stack navigation
│   │   └── MainNavigator.js  # Main app stack navigation
│   ├── screens/         # Screen components
│   │   ├── Chat.js           # Chat screen
│   │   ├── Home.js           # Home screen
│   │   ├── Login.js          # Login screen
│   │   ├── Signup.js         # Signup screen
│   │   ├── Splash.js         # Splash screen
│   │   └── Users.js          # Users list screen
│   ├── services/        # API and external services
│   │   ├── authService.js    # Authentication API calls
│   │   ├── chatService.js    # Chat API calls
│   │   └── userService.js    # User API calls
│   ├── types/           # Type definitions
│   │   └── chat.js           # Chat type definitions
│   └── utils/           # Utility functions and constants
│       ├── chatUtils.js      # Chat-related utilities
│       └── constants.js      # App constants
├── android/             # Android native code
├── ios/                 # iOS native code
├── __tests__/           # Unit tests
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler configuration
├── tsconfig.json        # TypeScript configuration
├── jest.config.js       # Jest testing configuration
└── package.json         # Project dependencies

```

## Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bridge
```

2. **Install dependencies**
```bash
npm install
# OR
yarn install
```

3. **Install iOS CocoaPods** (first time only or after dependency updates)
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Getting Started

### Running on Android

1. Start Metro bundler:
```bash
npm start
```

2. In a new terminal, run:
```bash
npm run android
```

### Running on iOS

1. Start Metro bundler:
```bash
npm start
```

2. In a new terminal, run:
```bash
npm run ios
```

### Development with Fast Refresh

The app uses Fast Refresh for instant code updates. When you save a file, changes appear immediately without full reload.

To force a full reload:
- **Android**: Press <kbd>R</kbd> twice or use <kbd>Ctrl</kbd> + <kbd>M</kbd> → Reload
- **iOS**: Press <kbd>R</kbd> in the simulator

## Key Components

### Authentication Flow
- Users start at the splash screen while auth state is checked
- Unauthenticated users see Login/Signup screens
- Authenticated users access the main chat interface

### Navigation Structure
- **AuthNavigator**: Login and Signup screens
- **MainNavigator**: Home, Chat, and Users screens
- **AppNavigator**: Manages switch between Auth and Main based on user state

### Services
- **authService**: Handles user registration, login, and logout
- **chatService**: Manages message sending/receiving
- **userService**: Fetches and manages user data

## Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Build Android APK
npm run build:android

# Build iOS app
npm run build:ios
```

## Troubleshooting

### Metro Bundler Issues
- Clear cache: `npm start -- --reset-cache`
- Kill process on port 8081: `lsof -ti:8081 | xargs kill -9`

### Android Issues
- Clean build: `cd android && ./gradlew clean && cd ..`
- Rebuild: `npm run android`

### iOS Issues
- Clean pods: `cd ios && rm -rf Pods && bundle exec pod install && cd ..`
- Xcode cache: Clean build folder (Cmd+Shift+K)

### Dependency Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

## Development Workflow

1. Create a new branch for features: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly
3. Commit with descriptive messages: `git commit -m "Add feature description"`
4. Push to remote: `git push origin feature/your-feature`
5. Create a pull request

## Testing

Run the test suite:
```bash
npm test
```

Tests are located in `__tests__/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Push your changes
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Guide](https://reactnavigation.org/)
- [Context API Guide](https://reactnative.dev/docs/context)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
