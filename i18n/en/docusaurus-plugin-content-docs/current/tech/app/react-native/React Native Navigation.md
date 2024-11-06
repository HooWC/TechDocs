---
id: rn-navigation
slug: /rn-navigation
title: Navigation
date: 2024-11-04
authors: Hoo
tags: [react-native]
keywords: [react-native]
---

# React Native Expo Navigation

[**DOCS Official Website**](https://docs.expo.dev/router/installation/)

`npx create-expo-app --template` is a command for quickly creating an Expo application. It helps you create a new project and select a template to initialize the project. This command has pre-installed some common dependencies and configurations, so you don't need to manually run `npx expo install` to install additional packages.

### Detailed steps and explanations

1. **Install Node.js and npm** First, you need to make sure you have installed [Node.js](https://nodejs.org/) and npm (Node.js package manager). You can check if it is installed with the following command:

   ```
   node -v
   npm -v
   ```

  If not installed, visit the Node.js official website to install it.

2. **Install Expo CLI (if not installed)** Expo CLI is a tool for creating and managing Expo applications. If you don't have Expo CLI installed yet, you can install it through npm using the following command:

```
npm install -g expo-cli
```

This will install Expo CLI globally, allowing you to run Expo commands in the command line.

3. **Create a new Expo application** Use the `npx create-expo-app` command to create a new Expo application. You can choose a template to initialize the project. If you don't specify a template, a basic Expo application will be created by default.

Run the following command:

   ```
   npx create-expo-app MyNewApp --template
   ```

   Here, `MyNewApp` is the name of your new app. You can change it to whatever you like.

4. **Choose a template** When you execute `npx create-expo-app MyNewApp --template`, the command will create a new folder `MyNewApp` and initialize an Expo project. Expo provides several templates that you can choose from:

- **`blank`**: A blank template suitable for building an app from scratch.

- **`tabs`**: A template with tab navigation, suitable for multi-page apps.

- **`stack`**: A template with stack navigation, suitable for apps with a navigation stack.

If you want to choose a specific template, such as a template with tab navigation, you can run the following command:

   ```
   npx create-expo-app MyNewApp --template tabs
   ```

  This will create an app template with tabbed navigation.

5. **Enter the project directory** After creating the app, enter your project directory:

```
cd MyNewApp
```

6. **Start the Expo development server** In the project directory, you can start the Expo development server with the following command:

   ```
   npm start
   ```

   或者：

   ```
   expo start
   ```

  This will start the Expo development server and open a browser window showing your app. You can use the Expo Go app to scan the QR code on your phone to preview the app, or view it in the browser.

### Summary

- **`npx create-expo-app --template`** is used to create a new Expo app and select a template. The template has pre-configured some common dependencies to help you quickly start app development.
- You don't need to install additional dependencies because the template has automatically prepared the required basic configuration for you.
- Just run the command and select the template, Expo will help you initialize a new project, allowing you to focus on development without worrying about environment configuration and dependency installation.

With these steps, you can easily create and start a new Expo app and start building your mobile app project.

## Project Example:

### Main Layout

In React Native, "Stack" usually refers to Stack Navigation, which is a navigation mode that allows users to navigate between different screens in a stacked manner.

`app/_layout.jsx`

```react
import { Stack } from "expo-router";

const RootLayout = () => (
  <Stack>
    <Stack.Screen 
        name="index" 
        options={{
            headerTitle: "Home Page",
            headerStyle: {
                backgroundColor: "red",
            },
        }} />
    <Stack.Screen 
        name="users/[id]" 
        options={{
            headerTitle: "User Page",
        }} />
  </Stack>
);

export default RootLayout;
```

With `Tabs`

```react
import { Stack } from "expo-router";

const RootLayout = () => (
  <Stack>
    <Stack.Screen name="(tabs)" />
  </Stack>
);

export default RootLayout;
```



`Redirect`

```react
import { Redirect } from 'expo-router'

<Redirect href="/home" />
```



`Two ways`

```react
import { Link } from "expo-router";

<Link href="/user/1">Go to user 1</Link>
```

```react
import { router } from "expo-router";
import { Pressable } from "react-native";

<Pressable onPress={() => router.push("/user/2")}>
	<Text>Go to user 2</Text>
</Pressable>
```



`Transfer data`

```react
import { router } from "expo-router";
import { Pressable } from "react-native";

<Pressable onPress={() => router.push({
        pathname: "/user/[id]",
        params: { id: 2 }
    })}>
	<Text>Go to user 2</Text>
</Pressable>
```

`Use data`

```react
import { useLocalSearchParams } from "expo-router";

const { id } = useLocalSearchParams();
```

```react
import { useLocalSearchParams } from "expo-router";

const { id } = useLocalSearchParams<{
	id: string
}>();
```



### Tabs (Sub-Layout)

In React Native, "Tabs" usually refers to Tab Navigation, which is a common user interface design pattern used to switch between different views or functions in an application.

**Tabs are usually located at the bottom of the screen**

```react
import { Tabs } from "expo-router";

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                title: "Home"
            }}/>
            <Tabs.Screen name="users/[id]" options={{
                headerTitle: "User Page",
                title: "User"
            }}/>
        </Tabs>
    )
}

export default TabsLayout;
```





## Project Example (Login)

`app/(app)`

- `app/(app)/(tabs)/...`

- `app/(app)/_layout.tsx`

  ```react
  import { Stack } from "expo-router";
  
  export default function AppEntry() {
      return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      )
  }
  ```

  

`app/(auth)`

- `app/(auth)/login.tsx`

  ```react
  export default function LoginScreen() {
  
    const { signIn } = useAuth();
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button title="Sign In" color={"orange"} onPress={signIn} />
      </View>
    );
  }
  ```

  

`app/_layout.tsx`

```react
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
```



`context/auth.tsx`

```react
import * as React from 'react';
import { useSegments, useRouter } from "expo-router";

const AuthContext = React.createContext<any>(null);

export function useAuth(){
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }:React.PropsWithChildren) {

    const rootSegment = useSegments()[0];
    const router = useRouter();
    const [user, setUser] = React.useState<string | undefined>("");

    React.useEffect(() => {
        if(user === undefined) return;

        if(!user && rootSegment !== "(auth)") {
            // If the user does not exist, but the interface comes to auth, it returns to the login interface
            router.replace("/(auth)/login");
        }else if(user && rootSegment !== "(app)"){
            // If the user exists
            router.replace("/");
        }
    }, [user, rootSegment]);

    const signIn = () => {
        setUser("Beto")
    };

    const signOut = () => {
        setUser("")
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
```