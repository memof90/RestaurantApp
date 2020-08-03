import React, { Component } from 'react';
import {Alert, BackHandler, Button, FlatList, Image, Modal, Picker,Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { CheckBox } from "native-base";
import Constants from 'expo-constants';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// importaciones externas 

import CustomButton from '../Components/CustomButton';

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
      
            <View style={{ paddingTop:80}}>
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
    choiceScreenHeadline : {
        fontSize : 30,
        marginTop : 20,
        marginBottom : 20
      },
    
      choiceScreenListContainer : {
        width : "94%"
      },
    
      choiceScreenListItem : {
        flexDirection : "row",
        marginTop : 4,
        marginBottom : 4,
        borderColor : "#e0e0e0",
        borderBottomWidth : 2,
        alignItems : "center"
      },
    
      choiceScreenListItemName : {
        flex : 1
      },
    
      postChoiceScreenContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center",
      },
    
      postChoiceHeadline : {
        fontSize : 32,
        paddingBottom : 80
      },
    
      postChoiceDetailsContainer : {
        borderWidth : 2,
        borderColor : "#000000",
        padding : 10,
        width : "96%"
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
        color : "#ff0000"
      },
    
      postChoiceDetailsValue : {
        width : 300
      }
});

//make this component available to the app
export default PostChoiceScreen;
