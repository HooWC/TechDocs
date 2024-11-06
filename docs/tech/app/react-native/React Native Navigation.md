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

[**DOCS 官网**](https://docs.expo.dev/router/installation/)

`npx create-expo-app --template` 是一个用于快速创建 Expo 应用的命令，它帮助你创建一个新的项目，并选择一个模板来初始化项目。这条命令已经将一些常用的依赖和配置预先安装好，因此你不需要再手动运行 `npx expo install` 来安装额外的包。

### 详细步骤与解释

1. **安装 Node.js 和 npm** 首先，你需要确保已经安装了 [Node.js](https://nodejs.org/) 和 npm（Node.js 包管理器）。你可以通过以下命令来检查是否已经安装：

   ```
   node -v
   npm -v
   ```

   如果没有安装，请访问 Node.js 官网进行安装。

2. **安装 Expo CLI（如果没有安装）** Expo CLI 是用于创建和管理 Expo 应用的工具。如果你还没有安装 Expo CLI，可以使用以下命令通过 npm 安装：

   ```
   npm install -g expo-cli
   ```

   这会全局安装 Expo CLI，使得你能够在命令行中运行 Expo 命令。

3. **创建新的 Expo 应用** 使用 `npx create-expo-app` 命令来创建一个新的 Expo 应用。你可以选择一个模板来初始化项目。如果你没有指定模板，默认会创建一个基本的 Expo 应用。

   运行以下命令：

   ```
   npx create-expo-app MyNewApp --template
   ```

   这里，`MyNewApp` 是你新应用的名字，你可以根据需求更改成你喜欢的名字。

4. **选择模板** 当你执行 `npx create-expo-app MyNewApp --template` 时，命令会创建一个新的文件夹 `MyNewApp` 并初始化一个 Expo 项目。Expo 提供了几种模板，你可以选择：

   - **`blank`**：一个空白的模板，适用于从头开始构建应用。
   - **`tabs`**：一个带有标签页导航的模板，适用于多页面应用。
   - **`stack`**：一个带有堆栈导航的模板，适用于具有导航堆栈的应用。

   如果你想选择一个特定的模板，例如带标签页导航的模板，可以运行以下命令：

   ```
   npx create-expo-app MyNewApp --template tabs
   ```

   这将创建一个带有标签页导航的应用模板。

5. **进入项目目录** 创建应用之后，进入你的项目目录：

   ```
   cd MyNewApp
   ```

6. **启动 Expo 开发服务器** 在项目目录下，你可以通过以下命令启动 Expo 开发服务器：

   ```
   npm start
   ```

   或者：

   ```
   expo start
   ```

   这将启动 Expo 开发服务器并打开一个浏览器窗口，展示你的应用。你可以使用 Expo Go app 在手机上扫描二维码来预览应用，或者在浏览器中查看。

### 总结

- **`npx create-expo-app --template`** 用于创建新的 Expo 应用并选择一个模板。模板中已经预先配置了一些常用的依赖，帮助你快速启动应用开发。
- 你不需要额外安装依赖，因为模板已经自动为你准备好了所需的基础配置。
- 只需运行命令并选择模板，Expo 会帮你初始化一个新的项目，让你专注于开发，而不必担心环境配置和依赖安装。

通过这些步骤，你就可以非常轻松地创建并启动一个新的 Expo 应用，开始构建你的移动应用项目。



## 项目例子：

### 主 Layout

在 React Native 中，"Stack" 通常指的是堆栈导航（Stack Navigation），它是一种导航模式，允许用户在不同的屏幕之间进行堆叠式的导航。

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

有 `Tabs` 的

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



`两种方式`

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



`传数据`

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

`用数据`

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



### Tabs (副 Layout)

在 React Native 中，"Tabs" 通常指的是选项卡导航（Tab Navigation），它是一种常见的用户界面设计模式，用于在应用程序中切换不同的视图或功能。

**选项卡通常位于屏幕底部**

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





## 项目例子 （登入）

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
            // 如果用户不存在 ， 界面却来到 auth ， 就返回登入界面
            router.replace("/(auth)/login");
        }else if(user && rootSegment !== "(app)"){
            // 如果用户存在
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





























