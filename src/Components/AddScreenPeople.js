import React, { Component } from 'react';
import { Alert, BackHandler, FlatList, Picker, Platform, ScrollView,StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import { Root, Toast } from "native-base";


// importaciones externas 
import CustomTextInput from './CustomTextInput';
import CustomButton from '../Components/CustomButton'

class AddScreenPeople extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            firstName : "",
            lastName : "",
            relationship : "",
            key : `p_${new Date().getTime()}`
         };
    }
    render() { 
        return (  

            <Root>
            <ScrollView style={styles.addScreenContainer}>
              <View style={styles.addScreenInnerContainer}>
                <View style={styles.addScreenFormContainer}>
                  { /* ########## First Name ########## */ }
                  <CustomTextInput
                    label="First Name"
                    maxLength={20}
                    stateHolder={this}
                    stateFieldName="firstName"
                  />
                  { /* ########## Last Name ########## */ }
                  <CustomTextInput
                    label="Last Name"
                    maxLength={20}
                    stateHolder={this}
                    stateFieldName="lastName"
                  />
                  { /* ########## Relationship ########## */ }
                  <Text style={styles.fieldLabel}>Relationship</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      prompt="Relationship"
                      selectedValue={this.state.relationship}
                      onValueChange={
                        (inItemValue) => this.setState({ relationship : inItemValue })
                      }
                    >
                      <Picker.Item label="" value="" />
                      <Picker.Item label="Me" value="Me" />
                      <Picker.Item label="Family" value="Family" />
                      <Picker.Item label="Friend" value="Friend" />
                      <Picker.Item label="Coworker" value="Coworker" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </View>
                { /* ########## Buttons ########## */ }
                <View style={styles.addScreenButtonsContainer}>
                  <CustomButton
                    text="Cancel"
                    width="44%"
                    onPress={
                      () => { this.props.navigation.navigate("ListScreen"); }
                    }
                  />
                  <CustomButton
                    text="Save"
                    width="44%"
                    onPress={ () => {
                      AsyncStorage.getItem("people",
                        function(inError, inPeople) {
                          if (inPeople === null) {
                            inPeople = [ ];
                          } else {
                            inPeople = JSON.parse(inPeople);
                          }
                          inPeople.push(this.state);
                          AsyncStorage.setItem("people",
                            JSON.stringify(inPeople), function() {
                              this.props.navigation.navigate("ListScreen");
                            }.bind(this)
                          );
                        }.bind(this)
                      );
                    } }
                  />
                </View>
              </View>
            </ScrollView>
          </Root>

        );
    }
}

const styles = StyleSheet.create({
    
    addScreenContainer : {
        marginTop : Constants.statusBarHeight
      },
    
      addScreenInnerContainer : {
        flex : 1,
        alignItems : "center",
        paddingTop : 20,
        width : "100%"
      },
    
      addScreenFormContainer : {
        width : "96%"
      },
    
      fieldLabel : {
        marginLeft : 10
      },
    
      pickerContainer : {
        ...Platform.select({
          ios : { },
          android : {
            borderRadius : 8,
            borderColor : "#c0c0c0",
            borderWidth : 2,
            width : "96%",
            marginLeft : 10,
            marginBottom : 20,
            marginTop : 4
          }
        })
      },
    
      picker : {
        ...Platform.select({
          ios : {
            width : "96%",
            borderRadius : 8,
            borderColor : "#c0c0c0",
            borderWidth : 2,
            marginLeft : 10,
            marginBottom : 20,
            marginTop : 4
          },
          android : { }
        })
      },
    
      addScreenButtonsContainer : {
        flexDirection : "row",
        justifyContent : "center"
      }
})
 
export default AddScreenPeople;