import React, { Component } from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { Root, Toast } from "native-base";

// importacion componentes
import CustomButton from '../Components/CustomButton';


class ListScreenPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listData:[ ]
        };
    }
    render() { 
        return (  

            <Root>
            <View style={styles.listScreenContainer}>
              { /* ########## Add Person button ########## */ }
              <CustomButton
                text="Add Person"
                width="94%"
                onPress={ () => { this.props.navigation.navigate("AddScreen"); } }
              />
              { /* ########## Person list ########## */ }
              <FlatList
                style={styles.personList}
                data={this.state.listData}
                renderItem={ ({item}) =>
                  <View style={styles.personContainer}>
                    <Text style={styles.personName}>
                      {item.firstName} {item.lastName} ({item.relationship})
                    </Text>
                    <CustomButton
                      text="Delete"
                      onPress={ () => {
                        Alert.alert("Please confirm",
                          "Are you sure you want to delete this person?",
                          [
                            { text : "Yes",
                              onPress : () => {
                                // Pull data out of storage.
                                AsyncStorage.getItem("people",
                                  function(inError, inPeople) {
                                    if (inPeople === null) {
                                      inPeople = [ ];
                                    } else {
                                      inPeople = JSON.parse(inPeople);
                                    }
                                    // Find the right one to delete and splice it out.
                                    for (let i = 0; i < inPeople.length; i++) {
                                      const person = inPeople[i];
                                      if (person.key === item.key) {
                                        inPeople.splice(i, 1);
                                        break;
                                      }
                                    }
                                    // Store updated data in storage.
                                    AsyncStorage.setItem("people",
                                      JSON.stringify(inPeople), function() {
                                        // Set new state to update list.
                                        this.setState({ listData : inPeople });
                                        // Show toast message to confirm deletion.
                                        Toast.show({
                                          text : "Person deleted",
                                          position : "bottom",
                                          type : "danger",
                                          duration : 2000
                                        });
                                      }.bind(this)
                                    );
                                  }.bind(this)
                                );
                              }
                            },
                            { text : "No" },
                            { text : "Cancel", style : "cancel" }
                          ],
                          { cancelable : true }
                        )
                      } }
                    />
                  </View>
                }
              />
            </View>
          </Root>
            
        );
    }

     /**
   * Execute after the component mounts.
   */
  componentDidMount() {

    // Block hardware back button on Android.
    BackHandler.addEventListener(
      "hardwareBackPress", () => { return true; }
    );

    // Get list of people.
    AsyncStorage.getItem("people",
      function(inError, inPeople) {
        if (inPeople === null) {
          inPeople = [ ];
        } else {
          inPeople = JSON.parse(inPeople);
        }
        this.setState({ listData : inPeople });
      }.bind(this)
    );

  }; /* End componentDidMount() */
}

const styles = StyleSheet.create({

    listScreenContainer : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        /* Branch on platform type for different styling. */
        ...Platform.select({
          ios : {
            paddingTop : Constants.statusBarHeight
          },
          android : { }
        })
      },

      personList : {
        width : "94%"
      },

      personContainer : {
        flexDirection : "row",
        marginTop : 4,
        marginBottom : 4,
        borderColor : "#e0e0e0",
        borderBottomWidth : 2,
        alignItems : "center"
      },

      personName : {
        flex : 1
      },
    
    
})
 
export default ListScreenPeople;