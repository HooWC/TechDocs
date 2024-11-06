---
id: rn-base
slug: /rn-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [react-native]
keywords: [react-native]
---

# React Native Expo Base

[**Official Website**](https://expo.nodejs.cn/get-started/create-a-project/)

React Native is an open source framework for building cross-platform mobile applications. Developed and maintained by Facebook, it allows developers to build native mobile applications using JavaScript and React. Compared with traditional mobile development methods, React Native has many advantages, the most important of which is that it can be developed on both iOS and Android platforms, reducing the amount of code developers need to write and providing a faster development cycle. React Native interprets JavaScript code as native components, making the performance of the application close to that of native applications, while also being able to take advantage of React's powerful componentization and declarative UI features.

## Android Studio Installation (if necessary) (——Basically no installation required——)

[**Tower build Android environment software installation video tutorial**](https://www.bilibili.com/video/BV1Pt4y1n7bD?p=3)


## Expo Go installation 📱

```
Install `Expo Go` software on your phone
```

## 🔔 Installation
```
npx create-expo-app <project-name>
```

## 🔔 Quickly build the `Navigation` project

```
npx create-expo-app --template

Select Navigation (TypeScript)
```





## 🔔 Start expo-cli

`expo-cli` does not require a USB connection. This is a convenient and fast development method provided by Expo, suitable for the development and testing of cross-platform mobile applications.

[**Issue Git Discussion**](https://github.com/expo/expo/issues/22747)

#### To start the project for the first time, please enter the following

```
npx expo-cli upgrade
```
#### Start

```
npx expo start
```





# Basic usage

Component files `Welcome.jsx` and `welcome.style.js`

`style` file

```react
import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});

export default styles;
```

`html` File

```html
style={styles.container}

style={[styles.container]}
```



### 🎐Function usage

```react
import React from 'react';
import { View, Button, Alert } from 'react-native';

const MyButton = () => {
  const handlePress = () => {
    Alert.alert('Button Pressed');
  };

  return (
    <View>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
};

export default MyButton;
```



### 🎐 React Native Tag

#### 🌍 View

```react
import { View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
    
    </View>
  );
}
```



#### 🌍 Text

```react
import { Text } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
```



#### 🌍 SafeAreaView

`SafeAreaView` automatically adjusts the layout of child components based on the device's screen edges to ensure that content is not obscured or extends outside the safe area of ​​the screen. On iPhone X and above, `SafeAreaView` automatically takes into account the fringe area, the bottom safe area, and possible Home Indicator areas so that content is not disturbed by these areas when displayed.

```react
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text>Content goes here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adapt to Android status bar
  },
});

export default Home;
```

Android can use the `getStatusBarHeight` library



#### 🌍 ScrollView

```react
import { ScrollView } from 'react-native'

const Home = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
        </View>
      </ScrollView>
  );
};

export default Home;
```

`showsVerticalScrollIndicator={false}` is a property of the ScrollView component that controls whether the vertical scroll bar is displayed.

`contentContainerStyle={{padding:30}}` is a property of scroll components such as ScrollView and FlatList that defines the container style of the scrolling content. This style will be applied to the container containing the scrolling content, not the scroll bar itself.

`horizontal={true}` // Set to horizontal scrolling

#### 🌍 Dismensions

`Dimensions` is an API in React Native for getting device size information. It provides a simple way to get the width and height of the device, as well as other related size information.

```react
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

const Home = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container]}>
        	<View style={[styles.itemBase]}>
        	   <Text> 1 </Text>
        	</View>
        	 <View style={[styles.itemBase]}>
        	   <Text> 2 </Text>
        	</View>
        	<View style={[styles.itemBase]}>
        	   <Text> 3 </Text>
        	</View>
        	 <View style={[styles.itemBase]}>
        	   <Text> 4 </Text>
        	</View> 
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: 'wrap'
    },
    itemBase: {
        width: Dimensions.get('window').width/4,
        height: 90,
        borderWidth: 1,
        borderColor: 'yellow'
    }
})

export default Home;
```



#### 🌍 StatusBar

`StatusBar` is a component in React Native that controls the device status bar. It allows you to control the color, style, display, etc. of the status bar. You can use `StatusBar` to set the background color, text color, whether to hide the status bar, etc. of the status bar.

```react
<StatusBar hidden={true} backgroundColor="red" barStyle={"dark-content"} />
```

The `barStyle` attribute of the `StatusBar` component is used to specify the text color theme of the status bar. There are two optional values:

1. `"dark-content"`: Set the status bar text color to a dark color (usually black), suitable for light backgrounds.
2. `"light-content"`: Set the status bar text color to a light color (usually white), suitable for dark backgrounds

```react
barStyle={"dark-content"}
```

```react
barStyle={"light-content"}
```



#### 🌍 Switch

`Switch` is a component used to switch the state of a switch. It provides a visual switch button that users can click to switch the state of the switch. You can control the state of the switch by setting the `value` property and handle the change of the switch state by listening to the `onValueChange` event.

```react
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Toggle Switch:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.status}>{isEnabled ? "Switch is ON" : "Switch is OFF"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
```

1. **trackColor**:
- The `trackColor` property is used to set the color of the switch track, that is, the background color of the switch.
- This property accepts an object as a value, which has two key-value pairs: `false` and `true`, which represent the colors when the switch is closed and opened respectively.
- For example, `trackColor={{ false: "#767577", true: "#81b0ff" }}` means that when the switch is closed, the color of the track is `#767577`, and when the switch is opened, the color of the track is `#81b0ff`.
2. **thumbColor**:
- The `thumbColor` property is used to set the color of the switch thumb (the small round button indicating the switch state).
- This property accepts a color string as a value, which is used to specify the color of the thumb.
- Usually, the color of the thumb will be different depending on the state of the switch. You can use conditional expressions to set the color in different states as needed.
- For example, `thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}` means that if the switch is on, the color of the thumb is `#f5dd4b`, otherwise it is `#f4f3f4`.

#### 🌍 ActivityIndicator (loding)

`ActivityIndicator` is a component used to display a loading indicator, usually used to display a loading animation when data is loading or processing. It provides different style and color options and can be customized as needed. When the application is performing network requests or other time-consuming operations in the background, you can use `ActivityIndicator` to tell the user that a loading operation is in progress.
```react
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data or executing long tasks
  useEffect(() => {
    const fetchData = async () => {
      // Simulate loading data or executing long tasks
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {/* Display the content after loading */}
          <Text>Data loaded successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

1. **small**: The indicator size is small.
2. **large**: The indicator size is large.

```
size={50} // number
```





#### 🌍 Animated
`Animated` is an API for creating animation effects in React Native. It provides a set of methods that can be used to create, combine, and time animations, including translation, rotation, scaling, transparency, and more. With `Animated`, you can easily add various animation effects to your application and enhance the user experience.

[**Official Website**](https://reactnative.cn/docs/animated)

```react
import React, {useRef} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

const App = () => {
  // fadeAnim The value that will be used as opacity. Initial value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // will change the fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // will change the fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to an animated value
            opacity: fadeAnim,
          },
        ]}>
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
```

```react
Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
    	alert("I'm out")
	});
```





#### 🌍 TextInput

`TextInput` is a text input box component used to accept user input. It allows users to enter text, numbers, passwords, etc., and provides some properties and events to control the style, behavior, and processing of input content.

[**Official Website**](https://reactnative.cn/docs/textinput)

```react
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const App = () => {
  const [text, setText] = useState('');

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  return (
    <View style={styles.container}>
      <Text>Enter your name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        secureTextEntry={true} // Set as password input box
        keyboardType="email-address" // Set the keyboard type to email-address
        placeholder="Type here..."
        multiline={true} // Support multi-line input
        numberOfLines={4} // The initial number of rows is 4
        textAlignVertical="top" // Set the text to start from the top
      />
      <Text>Your name is: {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default App;
```

`keyboardType` is a property of the TextInput component that specifies the type of keyboard to display when the user enters text.

Here are some commonly used `keyboardType` values:

- `default`: The default keyboard type, suitable for general text input.

- `numeric`: Displays a numeric keyboard, allowing the entry of numbers.

- `email-address`: Displays a keyboard with an `@` symbol, suitable for entering email addresses.

- `phone-pad`: Displays a phone number keyboard, suitable for entering phone numbers.

- `number-pad`: Displays a numeric keyboard, allowing the entry of numbers without a decimal point.

- `decimal-pad`: Displays a numeric keyboard, allowing the entry of numbers and a decimal point.

```
multiline and numberOfLines used with textAlignVertical
```
`textAlignVertical` is a property of the TextInput component that specifies the vertical alignment of text.

In React Native, the `textAlignVertical` property is only available on Android and controls the vertical alignment of text. It can accept several predefined values:

- `auto`: Default value. Automatically adjust vertical alignment based on text content.
- `top`: Text is aligned from the top.
- `bottom`: Text is aligned from the bottom.
- `center`: Text is vertically centered.






#### 🌍 KeyboardAvoidingView

`KeyboardAvoidingView` is a component used to automatically adjust the interface layout when the keyboard pops up. It can ensure that the input box is not blocked by the keyboard, thereby improving the user experience. It is usually used with `TextInput` to ensure that the input box can automatically adjust its position when the keyboard pops up.

####

#### 🌍 Image

`Image` is a component used to display images. It can display local images, remote images, network images, etc., and provides some properties and events for controlling image loading, scaling, cropping, etc.

```react
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get the screen width

const App = () => {
  return (
    <View style={styles.container}>
      {/* Display local pictures */}
      <Image
        source={require('./path/to/local/image.png')}
        style={styles.image}
      />

      {/* Display network pictures */}
      <Image
        source={{ uri: 'https://example.com/path/to/image.jpg' }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width, // Set the image width to the screen width
    height: 200, // Fixed Height
    resizeMode: 'cover', // Control how images are scaled
    marginBottom: 20,
  },
});

export default App;
```





#### 🌍 ImageBackground

`ImageBackground` is a component for displaying images with backgrounds. It allows you to overlay other components on the background to achieve complex layouts and styles.

#### 🌍 TouchableNativeFeedback

`TouchableNativeFeedback` is a component for implementing native touch feedback effects. It provides a touch feedback similar to the Android native button click effect, which allows users to feel the feedback effect of the button being clicked.

#### 🌍 TouchableOpacity

`TouchableOpacity` is a component for implementing button click effects. It provides an effect of reducing the opacity of the button when the user clicks it, so that the user can feel the feedback effect of the button being clicked.

`Transparency changes when touching`

```react
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const onPressButton = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressButton}
      >
        <Text style={styles.text}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
```



#### 🌍 TouchableHighlight

`TouchableHighlight` is a component used to implement touch highlighting effects. It highlights when the user touches it, providing a feedback effect similar to clicking a button. It is usually used to implement buttons or other clickable elements.

[**Official Website**](https://reactnative.cn/docs/touchablehighlight)

`Highlight on touch`

```react
import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const App = () => {
  const onPressButton = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={onPressButton}
        underlayColor="lightblue" // Color displayed when touched
      >
        <Text style={styles.text}>Press Me</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
```





#### 🌍 TouchableWithoutFeedback

`TouchableWithoutFeedback` is a component for implementing non-feedback touch effects. It does not provide any feedback effects, but only triggers corresponding events when the user touches. It is usually used to implement custom interactive effects.

`TouchableWithoutFeedback` does not provide any click feedback

```react
import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const App = () => {
  const onPressButton = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.text}>Press Me</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
```





#### 🌍 Button
`Button` is a component used to create native buttons. It provides a simple button interface for triggering corresponding actions or events. `Button` components are usually cross-platform and have similar appearance and behavior on different platforms.

[**Official Website**](https://reactnative.cn/docs/button)

`onPress`

```react
<Button title="Press Me" onPress={handlePress} />
```



#### 🌍 Alert

`Alert` is an API for displaying alert boxes in React Native. It can be used to display warnings, confirmations, or prompts in applications, usually to prompt users with some important information or operations.
```react
import { View, Button, Alert } from 'react-native';

Alert.alert('Button Pressed');
```

```react
import React from 'react';
import { View, Button, Alert } from 'react-native';

const MyAlert = () => {
  const showAlert = () => {
    Alert.alert(
      'Title',
      'Are you sure you want to perform this operation?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel button is clicked'),
          style: 'cancel',
        },
        {
          text: 'Sure',
          onPress: () => console.log('The Sure button is clicked'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Button title="Show tooltip" onPress={showAlert} />
    </View>
  );
};

export default MyAlert;
```

`cancelable: false` is a configuration option that sets whether the Alert component allows the prompt box to be closed by clicking a blank area of ​​the screen or pressing the back key.

When `cancelable` is set to `true`, the user can close the prompt box by clicking a blank area of ​​the screen or pressing the back key. This is the default behavior and is suitable for most scenarios where the user can manually close the prompt box.

However, when `cancelable` is set to `false`, it means that the user cannot close the prompt box by clicking a blank area of ​​the screen or pressing the back key. This is usually used for some important prompts or confirmation boxes to ensure that the user cannot easily close the prompt box and must make an explicit choice.



- ```
  style
  ```

 : The style of the button, used to define the appearance of the button. Optional values ​​include:

- `default`: The default style, usually used for normal buttons.
- `cancel`: The cancel style, usually used for buttons that cancel operations.
- `destructive`: The destructive style, usually used for buttons that perform dangerous or irreversible operations.


Example

```react
import React from 'react';
import { View, Button, Alert } from 'react-native';

const MyAlert = () => {
  const showAlert = () => {
    Alert.alert(
      'Title',
      'Are you sure you want to perform this operation?？',
      [
        {
          text: 'Try again later',
          onPress: () => console.log('Remind me later'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel button is clicked'),
          style: 'cancel',
        },
        {
          text: 'Sure',
          onPress: () => console.log('The Sure button is clicked'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Button title="Show tooltip" onPress={showAlert} />
    </View>
  );
};

export default MyAlert;
```



#### 🌍 Platform

`Platform` is an API provided by React Native to obtain information about the current running platform. Through `Platform`, you can determine which platform the current application is running on (such as iOS, Android, or Web) so that you can process or adapt it accordingly according to different platforms.

```
paddingTop: platform === "ios" ? (variables.isIphoneX ? 39 : 15) : 0
height: platform === "ios" ? (isIphoneX ? 88 : 64) : 56
```



#### 🌍 FlatList

`FlatList` is a high-performance list component for displaying list data. It can scroll and display a large amount of data, and provides some optimization methods to improve the performance and fluency of the list, such as lazy loading of data, scrolling optimization, etc.

[**Official Website**](https://reactnative.cn/docs/flatlist)

```react
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const App = () => {
  // Sample Data
  const DATA = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Item 8' },
    { id: '9', title: 'Item 9' },
    { id: '10', title: 'Item 10' },
  ];

  // Render each list item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA} // Setting list data
        renderItem={renderItem} // Render each list item
        keyExtractor={item => item.id} // Extract the unique key for each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default App;
```



#### 🌍 SectionList

`SectionList` is a list component with group headers. It is similar to `FlatList`, but can display list data in groups and display group headers between each group.

[**Official Website**](https://reactnative.cn/docs/sectionlist)

```react
import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, refreshControl } from 'react-native';

const App = () => {
  // Sample Data
  const DATA = [
    {
      title: 'Group 1',
      data: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      title: 'Group 2',
      data: ['Item 4', 'Item 5'],
    },
    {
      title: 'Group 3',
      data: [],
    },
  ];
    
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate refresh operations. In actual applications, network requests are usually initiated or other asynchronous operations are performed.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Renders the title of each group
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  // Render each item in each group
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  // The component to display when the list is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text>No data available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA} // Set up packet data
        keyExtractor={(item, index) => item + index} // Set a unique key for each item
        renderItem={renderItem} // Render each item
        renderSectionHeader={renderSectionHeader} // Renders the title of each group
        ItemSeparatorComponent={() => <View style={styles.separator} />} // Set the separator component
        ListEmptyComponent={renderEmptyComponent} // Set the component to display when the list is empty
        refreshing={refreshing} // Set the pull-to-refresh state
        onRefresh={onRefresh} // Set the pull-down refresh callback function
          
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Refresh Control
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```



#### 🌍 Modal

`Modal` is a component used to display a modal box. It can display an overlay on the current interface and display a custom content on it. It is usually used to implement dialog boxes, prompt boxes or other temporary interfaces that require user interaction.


## Plugins

```
npm i expo-font axios react-native-dotenv
```