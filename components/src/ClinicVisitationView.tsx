import { ClinicData } from './typedefs'
import { StyleSheet, TextInput, Text, SafeAreaView, KeyboardAvoidingView, Platform, View, Button, Image, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertClinicData, db } from './Database';
import { useBioDataContext } from './BioDataContext';


const ClinicVisitationView: React.FC = () => {
    const { biodataId } = useBioDataContext();
    const [clinicData, setClinicData] = useState<ClinicData>({ clinicDate: new Date(), natureOfAilment: '', medicinePrescribed: '', procedureUndertaken: '', dateNextAppointment: new Date() });
    const defaultNatureOfAilment = 'e.g Tooth ache';
    const defaultMedicinePrescribed = 'e.g Aspirin';
    const defaultProcedureUndertaken = 'e.g Teeth whitening';

    const [clinicDateshow, setClinicDateShow] = useState(false);
    const [dateAppointmentshow, setDateAppointmentShow] = useState(false);


    const onChangeClinicDate = (event: any, selectedDate: Date | any) => {
        setClinicDateShow(false);
        setClinicData({ ...clinicData, clinicDate: selectedDate })
    };

    const onChangeDateNextAppointment = (event: any, selectedDate: Date | any) => {
        setDateAppointmentShow(false);
        setClinicData({ ...clinicData, dateNextAppointment: selectedDate })
    };

    const showClinicDatePicker = () => {
        setClinicDateShow(true);
    };

    const showDateNextAppointmentPicker = () => {
        setDateAppointmentShow(true);
    };

    const handleSubmit = () => {
        if (biodataId === null) {
            alert(`Error: Please fill in your BioData first`);
            return;
        }
        insertClinicData(clinicData, biodataId);
    };

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS clinicdata (
                    id INTEGER PRIMARY KEY NOT NULL,
                    clinicdate TEXT,
                    natureofailment TEXT,
                    medicineprescribed TEXT,
                    procedureundertaken TEXT,
                    datenextappointment TEXT,
                    biodataid INTEGER,
                    FOREIGN KEY (biodataid) REFERENCES biodata(id)
                  );`
            );
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
                <ScrollView>
                    <View>
                        <Image source={require("../../assets/images/logo5.png")}
                            style={styles.logo} />
                    </View>

                    <Text style={styles.header}>Clinic visitation Information</Text>
                    <Text style={styles.info}>Please fill in your clinic visit information </Text>

                    <Text style={styles.text}>Clinic Date</Text>
                    <SafeAreaView>
                        <Pressable
                            onPress={() => showClinicDatePicker()}>
                            <TextInput editable={false} style={styles.calendarInput}
                                value={clinicData.clinicDate.toLocaleDateString()}
                            />
                        </Pressable>

                        {clinicDateshow && (
                            <DateTimePicker
                                testID="clinicDate"
                                value={clinicData.clinicDate}
                                mode="date"
                                display="default"
                                onChange={onChangeClinicDate}
                                minimumDate={new Date()}
                            />
                        )}
                    </SafeAreaView>

                    <Text style={styles.text}>Nature of Ailment</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={natureOfAilment => setClinicData({ ...clinicData, natureOfAilment })}
                        placeholder={defaultNatureOfAilment}
                        defaultValue={clinicData.natureOfAilment} />

                    <Text style={styles.text}>Medicine Prescribed</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={medicinePrescribed => setClinicData({ ...clinicData, medicinePrescribed })}
                        placeholder={defaultMedicinePrescribed}
                        defaultValue={clinicData.medicinePrescribed} />

                    <Text style={styles.text}>Procedure undertaken</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={procedureUndertaken => setClinicData({ ...clinicData, procedureUndertaken })}
                        placeholder={defaultProcedureUndertaken}
                        defaultValue={clinicData.procedureUndertaken} />

                    <Text style={styles.text}>Date of Next Appointment</Text>
                    <SafeAreaView>
                        <Pressable
                            onPress={() => showDateNextAppointmentPicker()}>
                            <TextInput editable={false} style={styles.calendarInput}
                                value={clinicData.dateNextAppointment.toLocaleDateString()}
                            />
                        </Pressable>

                        {dateAppointmentshow && (
                            <DateTimePicker
                                testID="dateNextAppointment"
                                value={clinicData.dateNextAppointment}
                                mode="date"
                                display="calendar"
                                onChange={onChangeDateNextAppointment}
                                minimumDate={new Date()}
                            />
                        )}

                        <Button title='Submit' onPress={handleSubmit} />
                    </SafeAreaView>
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

export default ClinicVisitationView