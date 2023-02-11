import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {

  const [servings, setServings] = useState(1);
  const homeImage = require("./assets/images/bruschetta.png");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bruschetta Recipe</Text>
      <Image style={styles.elementContainer} source={homeImage} />
      <View style={styles.elementContainer}>
        <TextInput style={styles.input} placeholder={"Enter the Number of servings"}
          onChangeText={(newText) => setServings(newText)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('Recipe')}>
          <Text style={styles.buttonText}>Veiw Recipe</Text>
        </Pressable>
      </View>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={styles.container}>
      <Text>Recipe Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Healthy Recipes',
            headerStyle: {
              backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function isValidInput( navigation, servings) {
  if (isNaN(servings) && servings < 1) {
    alert('Invalid Entry');
  } else {
    navigation.navigate('Recipe', servings);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    color: "#000",
  },
  elementContainer: {
    marginVertical: 10
  },
  input: {
     height: 40,
     fontSize: 20,
     textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#585858",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
});
