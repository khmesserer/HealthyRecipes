import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

function HomeScreen({ navigation }) {

  const [isValid, setIsValid] = useState(false);
  const [servings, setServings] = useState(0);
  const homeImage = require("./assets/images/bruschetta.png");

  function isValidInput(input) {
    try {
      if (input != null) {
        var numServings = parseInt(input);
        if (numServings > 0){
          setServings(numServings);
          return true;
        }
      }
    } catch (error) {}
    return false;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bruschetta Recipe</Text>
      <Image style={styles.elementContainer} source={homeImage} />
      <View style={styles.elementContainer}>
        <TextInput style={styles.input} placeholder={"Enter the Number of servings"}
          onChangeText={newText => setIsValid(isValidInput(newText))}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={() => isValid ? navigation.navigate('Recipe', {numServings: servings}) : alert('Invalid Entry')}
        >
          <Text style={styles.buttonText}>Veiw Recipe</Text>
        </Pressable>
      </View>
    </View>
  );
}

function RecipeScreen({ route, navigation }) {
  const {numServings} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bruschetta</Text>
      <View style={styles.recipeContainer}>
        <Text style={styles.recipe.title}>Ingredients</Text>
        <Text style={styles.recipe.content}>
          {4 * numServings} plum tomatoes{'\n'}
          {6 * numServings} basil leaves{'\n'}
          {3 * numServings} garlic cloves, chopped{'\n'}
          {3 * numServings} TB olive oil
        </Text>
        <Text style={styles.recipe.title}>Directions</Text>
        <Text style={styles.recipe.content}>
          Combine the Ingredients. Add salt to taste. Top French bread slices with mixture.
        </Text>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          title: 'Healthy Recipes',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
    marginVertical: 10,
  },
  recipeContainer: {
    marginHorizontal: 20,
  },
  recipe: {
    color: '#000',
    title: {
      marginTop: 20,
      fontSize: 35,
    },
    content: {
      fontSize: 25,
      marginLeft: 20,
    }
  },
  input: {
     height: 40,
     fontSize: 20,
     textAlign: 'center',
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
