import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addNotes } from '../redux copy/action/index';

function AddTodo({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('Default');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (!title.trim() || !description.trim() || !date) {
            // Show alert if any field is empty
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        const Selectedmoment = moment(date);
        const currentMoment = moment();

        if (Selectedmoment.isBefore(currentMoment, 'day')) {
            Alert.alert('Date Error', 'Selected date should be equal to or after the current date');
            return;
        }

        const todo = {
            id: Math.random() + 1,
            title: title,
            description: description,
            date: moment(date).format('YYYY-MM-DD'),
            status: status,
        };



        console.log('Todo added:', todo);

        navigation.navigate('Upcoming');
        dispatch(addNotes(todo));

        setTitle('');
        setDescription('');
        setDate(new Date());
        setStatus('Default');
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        const Selectedmoment = moment(currentDate);
        const currentMoment = moment();
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (Selectedmoment.isBefore(currentMoment, 'day')) {
            Alert.alert('Date Error', 'Selected date should be equal to or after the current date');
            return;
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Enter title"
                    />

                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Enter description"
                        multiline
                    />

                    <Text style={styles.label}>Date:</Text>
                    <TouchableOpacity
                        style={styles.datePickerContainer}
                        onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.datePickerText}>
                            {moment(date).format('YYYY-MM-DD')}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            minimumDate={new Date()}
                            onChange={onDateChange}
                        />
                    )}

                    {/* <Text style={styles.label}>Status:</Text>
                <Picker
                    style={styles.input}
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}>
                    <Picker.Item label="Default" value="Default" />
                    <Picker.Item label="Upcoming" value="Upcoming" />
                    <Picker.Item label="Completed" value="Completed" />
                </Picker> */}

                    <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                        <Text style={styles.buttonText}>Add Todo</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        color: 'black',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    datePickerContainer: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    datePickerText: {
        color: '#555',
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AddTodo;
