---
id: rn-install
slug: /rn-install
title: Plugin Library
date: 2024-11-04
authors: Hoo
tags: [react-native]
keywords: [react-native]
---

# React Native Plugin Library

:::info

React Native plugin libraries are a collection of additional features, components, or tools designed to extend and enhance the capabilities of React Native applications. These plugin libraries are developed by the community or official teams and address common development needs such as image processing, UI components, device function access, network requests, storage management, etc.

React Native itself provides some core components and APIs, but for more complex or specific features, developers often need to rely on third-party plugins. Plugin libraries provide an ecosystem for React Native where developers can quickly integrate existing solutions without having to develop all features from scratch.

:::

### The role of plugin libraries:

1. **Simplify the development process**: By integrating existing plugins, developers can save a lot of development time and effort. Many common features, such as data storage, push notifications, map components, etc., already have mature solutions.
2. **Improve application functionality**: Some features may not be provided in the core library of React Native. Third-party plugins enable developers to easily implement these features in their applications by providing additional features.
3. **Enhanced cross-platform capabilities**: React Native plugin libraries are usually cross-platform, which means they can support both Android and iOS, avoiding developers from writing duplicate code for each platform.
4. **Community support and open source**: Most React Native plugins are open source, which means developers can modify and customize them according to their needs, and even contribute their own code. The active community also means that the plugin library is constantly updated and improved to keep up with the development of React Native.

## WebView

- **Function**: WebView is an embedded browser component that allows you to display web content, such as web pages or HTML content, in your application.
- **Purpose**: It can be used to load and display web content, render HTML content, interact with web pages, etc.

Installation

```
npm install react-native-webview
```

```react
import React from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
  	<WebView source={{ uri: 'https://m.baidu.com' }} style={{ marginTop: 20 }} />
  )
};

export default App;
```



## Picker

- **Function**: Picker is a drop-down selector component that allows users to select a value from a predefined list of options.
- **Purpose**: Usually used to implement drop-down menus, date pickers, time pickers, etc. in user interfaces.

[**Git official website**](https://github.com/react-native-picker/picker)<br/>
[**NPM official website**](https://www.npmjs.com/package/react-native-picker-select)

Installation

```
npm install @react-native-picker/picker --save
```

```react
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker as PickerCode } from '@react-native-picker/picker';

const App = () => {
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View style={styles.container}>
      <PickerCode
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <PickerCode.Item label="Java" value="java" />
        <PickerCode.Item label="JavaScript" value="js" />
        <PickerCode.Item label="Python" value="python" />
        <PickerCode.Item label="Ruby" value="ruby" />
        <PickerCode.Item label="C++" value="cpp" />
      </PickerCode>
      <Text style={styles.text}>Selected language: {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
    height: 50,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default App;
```



## Swiper

- **Function**: Swiper is a carousel component that allows you to create carousels or image sliding effects in your application.
- **Purpose**: Used to create beautiful image carousel effects, usually used for advertising carousels, product displays, etc. in applications.

[**Git official website**](https://github.com/leecade/react-native-swiper)

Installation
```
npm i react-native-swiper --save

npm i --save react-native-swiper@next
```

```react
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
```

```react
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Platform, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';

const { height } = Dimensions.get('window');

const SwiperExample = () => {
  const swiperHeight = height * 0.25; // Calculate the height of Swiper to be 25% of the screen height

  return (
    <View style={styles.container}>
      <Swiper style={[styles.wrapper, { height: swiperHeight }]} autoplay={true} autoplayTimeout={2}>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.image}
          />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adapt to Android status bar
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SwiperExample;
```



## AsyncStorage

- **Function**: AsyncStorage is an API for local persistent storage data in React Native, similar to localStorage in Web development.
- **Purpose**: Used to store persistent data of applications, such as user configuration, application status, user login information, etc.

[**DOCS official website**](https://reactnative.dev/docs/asyncstorage)<br/>
[**NPM official website**](https://npmjs.com/package/@react-native-async-storage/async-storage)<br/>
[**GIT official website**](https://react-native-async-storage.github.io/async-storage/docs/usage)

Installation

```
npm i @react-native-async-storage/async-storage
```

```react
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [count, setCount] = useState(0);

  // 从 AsyncStorage Loading initial values
  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('count');
        if (value !== null) {
          setCount(parseInt(value));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save the count value to AsyncStorage 中
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('count', count.toString());
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(prevCount => prevCount + 1)} />
      <Button title="Decreasing" onPress={() => setCount(prevCount => prevCount - 1)} />
      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

export default App;
```



## Expo Location

- Through Expo Location, developers can easily obtain and utilize user location information in Expo applications to implement location-related functions and services, such as map applications, location services, location reminders, etc.

[** DOCS official website**](https://docs.expo.dev/versions/latest/sdk/location/)

Installation
```
npx expo install expo-location
```

```react
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request foreground location permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      // Get current location information
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {location ? (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default App;
```



## Expo Camera

- Expo Camera is a module in Expo SDK that makes it very simple to integrate camera functions in Expo applications. Expo Camera provides a series of easy-to-use components and APIs, allowing developers to easily implement functions such as taking photos and recording videos in applications.

Main functions and features include:

1. **Camera preview:** You can display a real-time camera preview in the application, and users can take photos and record videos through the interface.

2. **Photo function:** Support taking photos in the application, and you can set parameters such as photo quality and format.

3. **Video function:** Support recording videos in the application, and you can set parameters such as video quality and resolution.

4. **Permission management:** Expo Camera automatically handles permission requests and system camera access issues, so developers don’t need to worry about permission issues.

5. **Flash control:** You can control the device’s flash function for light assistance when taking photos and recording videos.

6. **Front and rear camera switching:** Support switching between front and rear cameras, and users can choose which camera to use for shooting.

7. **Custom interface:** The camera interface can be customized through custom styles and layouts to suit the design style of the application.

[**DOCS official website**](https://docs.expo.dev/versions/latest/sdk/camera/)<br/>
[**Material**](https://codewithbeto.dev/projects/camera-expo)

Installation

```
npx expo install expo-camera
```

```react
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraExample = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({
        quality: 1, // Set photo quality to half of original quality
        pictureSize: '140x480', // Set the photo resolution to 640x480
      });
      console.log(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref => setCameraRef(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default CameraExample;
```



## Expo MediaLibrary

Expo MediaLibrary is a library provided by Expo for managing photos and videos on the device in the Expo application. It provides a set of methods that allow you to get media files from the device's album, save new photos and videos, and delete media files.

**Main functions include:**

1. Get photo and video files on the device.

2. Save new photos and videos to the device.

3. Delete photo and video files on the device.

4. Get detailed information about photos and videos, such as size, type, etc.

[**DOCS official website**](https://docs.expo.dev/versions/latest/sdk/media-library/)<br/>
[**Material**](https://codewithbeto.dev/projects/camera-expo)

Installation
```
npx expo install expo-media-library
```

App.jsx

```react
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './src/components/Button';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        setImage(null);
        console.log('saved successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Take a picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
```

Button.jsx

```react
import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
});
```





## Expo ImagePicker

React Native Image Picker is a library for selecting images from the photo album or camera. It allows your application to interact with the user's device photo album and camera and get information about the selected image.

**Main features include:**

1. Select images from the photo album: Users can select images from the device's photo album.

2. Take pictures with the camera: Users can take new pictures with the device's camera.

3. Custom options: You can configure the behavior and appearance of the image picker, such as setting image quality, allowing cropping, selecting multiple images, etc.

[**DOCS Official Website**](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

Installation
```
npx expo install expo-image-picker
```

```react
import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permission is required to launch the image gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
```


## Other Expo third-party plug-ins

[**DOCS official website**](https://docs.expo.dev/versions/latest/sdk/accelerometer/)