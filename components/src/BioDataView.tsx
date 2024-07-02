import { BioData } from './typedefs'
import { StyleSheet, TextInput, Text, SafeAreaView, KeyboardAvoidingView, Platform, View, Button, Image, Pressable, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { useBioDataContext } from './BioDataContext';
import { insertBioData, db } from './Database';

const BioDataView: React.FC = () => {
  const { setBiodataId } = useBioDataContext();
  const [bioData, setBioData] = useState<BioData>({ firstName: '', surname: '', middleName: '', dateOfBirth: new Date(), homeAddress: '' });
  const defaultFirstName = 'Enter First Name';
  const defaultSurname = 'Enter Surname';
  const defaultMiddleName = 'Enter Middle Name';
  const defaultHomeAddress = 'Enter Home Address';


  const [showDateOfBirth, setShowDateOfBirth] = useState(false);

  const onChange = (event: any, selectedDate: Date | any) => {
    setShowDateOfBirth(false);
    setBioData({ ...bioData, dateOfBirth: selectedDate })
  };

  const showDateOfBirthPicker = () => {
    setShowDateOfBirth(true);
  };

  //Handle Biodata Submit
  const handleSubmit = () => {
    insertBioData(bioData, (insertedId) => {
      setBiodataId(insertedId);
    });
  };


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists biodata (id integer primary key not null, firstname text, middlename text, surname text, dateofbirth text, homeaddress text);"
      );
    });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >

        <View>
          <Image source={require("../../assets/images/logo5.png")}
            style={styles.logo} />
        </View>
        <ScrollView>
          <Text style={styles.header}>Biodata</Text>
          <Text style={styles.info}>Please fill in your biodata information </Text>

          <Text style={styles.text}>First Name</Text>
          <TextInput style={styles.textInput}
            onChangeText={firstName => setBioData({ ...bioData, firstName })}
            placeholder={defaultFirstName}
            defaultValue={bioData.firstName}
            autoFocus={true} />


          <Text style={styles.text}>Middle Name</Text>
          <TextInput style={styles.textInput}
            onChangeText={middleName => setBioData({ ...bioData, middleName })}
            placeholder={defaultMiddleName}
            defaultValue={bioData.middleName} />

          <Text style={styles.text}>Surname</Text>
          <TextInput style={styles.textInput}
            onChangeText={surname => setBioData({ ...bioData, surname })}
            placeholder={defaultSurname}
            defaultValue={bioData.surname} />

          <Text style={styles.text}>Date of Birth</Text>
          <SafeAreaView>
            <Pressable
              onPress={() => showDateOfBirthPicker()}>
              <TextInput editable={false} style={styles.calendarInput}
                value={bioData.dateOfBirth.toLocaleDateString()}
              />
            </Pressable>

            {showDateOfBirth && (
              <DateTimePicker
                testID="dateTimePicker"
                value={bioData.dateOfBirth}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </SafeAreaView>

          <Text style={styles.text}>Home Address</Text>
          <TextInput style={styles.textInput}
            onChangeText={homeAddress => setBioData({ ...bioData, homeAddress })}
            placeholder={defaultHomeAddress}
            defaultValue={bioData.homeAddress} />

          <Button title='Submit' onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e653',
    padding: 4,
    justifyContent: "center",
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  textInput: {
    marginBottom: 10,
    borderColor: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 100,
    fontSize: 15,
    color: 'blue'
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 40,
    alignSelf: 'center',

  },
  calendarInput: {
    color: 'blue',
    marginBottom: 10,
    borderColor: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 100
  },
  header: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
  info: {
    alignSelf: 'center',
    fontSize: 13,
  },
});

export default BioDataView;