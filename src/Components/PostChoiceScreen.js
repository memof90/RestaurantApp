import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

// lootie
import LottieView from "lottie-react-native";

/**
 * The restaurant that is ultimately chosen.
 */
let chosenRestaurant = { };


// create a component
class PostChoiceScreen extends Component {

    constructor(props) {

        super(props);
    
      }
    render() {
        return (
            <View style={styles.postChoiceScreenContainer}>

            <View>
                <LottieView 
            ref={animation => {
                  this.animation = animation
                }}
                style={styles.lottieAnimationTwo}
                source={require('../images/delivery.json')} 
             />
              <Text style={styles.postChoiceHeadline}>Enjoy your meal!</Text>
            </View>
      
            <View style={styles.postChoiceDetailsContainer}>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Name:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.name}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Cuisine:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.cuisine}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Price:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {"$".repeat(chosenRestaurant.price)}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Rating:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {"\u2605".repeat(chosenRestaurant.rating)}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Phone:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.phone}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Address:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.address}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Web Site:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.webSite}
                </Text>
              </View>
      
              <View style={styles.postChoiceDetailsRowContainer}>
                <Text style={styles.postChoiceDetailsLabel}>Delivery:</Text>
                <Text style={styles.postChoiceDetailsValue}>
                  {chosenRestaurant.delivery}
                </Text>
              </View>
      
            </View>
      
            <View style={{ paddingTop:40}}>
            <Button
              title="All Done"
              onPress={ () => this.props.navigation.navigate("DecisionTimeScreen") }
            />
            </View>
      
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
  
       postChoiceScreenContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center",
      },
    
      postChoiceHeadline : {
        fontSize : 32,
        paddingBottom : 40
      },
    
      postChoiceDetailsContainer : {
        borderWidth : 2,
        borderColor : "#000000",
        padding : 10,
        width : "96%",
        backgroundColor: '#222831',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
    
      postChoiceDetailsRowContainer : {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "flex-start",
        alignContent : "flex-start"
      },
    
      postChoiceDetailsLabel : {
        width : 70,
        fontWeight : "bold",
        color : "#ffffff"
      },
    
      postChoiceDetailsValue : {
        width : 300,
        color: "white"
    
      },
      lottieAnimationTwo:{
    
        width: 250
    
      }
});

//make this component available to the app
export default PostChoiceScreen;
