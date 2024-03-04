import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { deleteNote, updateNote } from '../redux copy/action/index';
import moment from 'moment';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';


function TodoItem({ item, onEditPress, handleRemovePress }) {

    // Function to clear all data from AsyncStorage
    // const clearAllData = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //         console.log('AsyncStorage data cleared successfully');
    //     } catch (error) {
    //         console.error('Error clearing AsyncStorage data:', error);
    //     }
    // };

    // Call the function to clear all data

    const [status, setStatus] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const isUpcoming = moment(item.date).isAfter(currentDate);
        setStatus(isUpcoming ? 'Upcoming' : item.status);
    }, [item]);
    useEffect(() => {
        const currentDate = new Date();
        const isPastDue = moment(item.date).isBefore(currentDate);
        setStatus(isPastDue ? 'Due' : 'Upcoming');
    }, [item]);

    return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.infoText}>
                    Date: {moment(item.date).format('YYYY-MM-DD')}
                </Text>
                <Text style={[styles.infoText, { color: status === 'Completed' ? '#2ecc71' : '#e74c3c' }]}>
                    Status: {status}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#3498db' }]} onPress={() => onEditPress(item)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={() => handleRemovePress(item)}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

}

function HomeScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDate, setEditedDate] = useState(new Date()); // Initialize with the current date
    const [showDatePicker, setShowDatePicker] = useState(false);
    const initialStatus = moment(new Date()).isAfter(new Date()) ? 'Due' : 'Cancle';
    const [editedStatus, setEditedStatus] = useState(initialStatus);
    const [showDueOption, setShowDueOption] = useState(false);




    const navigation = useNavigation();
    const data = useSelector((state) => state.addNotesReducer.note);

    const dispatch = useDispatch();

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || editedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setEditedDate(currentDate);
    };



    const handleRemovePress = (item) => {
        const data = {
            id: item.id,
        }

        dispatch(deleteNote(data))
    };
    const onEditPress = (item) => {
        setEditedItem(item);
        setEditedTitle(item.title);
        setEditedDescription(item.description);
        setEditedDate(item.date);
        setEditedStatus(item.status);
        setModalVisible(true);

    };

    const handleSaveEdit = () => {
        const updatedItem = {
            id: editedItem.id,
            title: editedTitle,
            description: editedDescription,
            date: moment(editedDate).format('YYYY-MM-DD'),
            status: editedStatus,
        };


        dispatch(updateNote(updatedItem));


        setModalVisible(false);
        setEditedItem({});
        setEditedTitle('');
        setEditedDescription('');
        setEditedDate('');
        setEditedStatus('');
    };


    const handlegoToAddTodo = () => [
        navigation.navigate('AddTodo')
    ]

    return (

        <View style={{ flex: 1, backgroundColor: "#A0AECD" }}>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TodoItem item={item}
                    onEditPress={onEditPress}
                    handleRemovePress={handleRemovePress}
                />}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Item</Text>
                        <Text style={styles.label}>Title:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Title"
                            value={editedTitle}
                            onChangeText={(text) => setEditedTitle(text)}
                        />
                        <Text style={styles.label}>Description:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Description"
                            value={editedDescription}
                            onChangeText={(text) => setEditedDescription(text)}
                        />
                        <Text style={styles.label}>Date:</Text>
                        <TouchableOpacity
                            style={styles.modalInput}
                            onPress={() => setShowDatePicker(true)}>
                            <Text style={{ color: 'black' }}>
                                {moment(editedDate).format('YYYY-MM-DD')}
                            </Text>
                        </TouchableOpacity>


                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            // minimumDate={new Date()}

                            />
                        )}




                        <Text style={styles.label}>Status:</Text>
                        <Picker
                            style={styles.modalInput}
                            selectedValue={editedStatus}
                            onValueChange={(itemValue) => setEditedStatus(itemValue)}
                        >
                            <Picker.Item label="Cancel" value="Cancel" />
                            <Picker.Item label="Completed" value="Completed" />
                            {showDueOption && <Picker.Item label="Due" value="Due" />}
                        </Picker>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: 'red' }]}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: 'green' }]}
                                onPress={handleSaveEdit}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>


            <View style={{ position: 'absolute', bottom: 30, right: 40, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        borderRadius: 100,
                        height: 70,
                        width: 70,
                        alignItems: 'center',
                        backgroundColor: 'blue',

                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                    onPress={handlegoToAddTodo}>

                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 50,
                            marginTop: 1,
                            borderRadius: 100,
                            height: 50,
                            width: 50,
                        }}>
                        +
                    </Text>

                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        elevation: 3,
    },

    description: {
        fontSize: 16,
        marginBottom: 8,
        color: 'gray',
    },
    infoText: {
        fontSize: 14,
        color: '#3498db',
        marginBottom: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
        width: '48%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        color: 'gray',
    },
    date: {
        fontSize: 14,
        marginBottom: 4,
        color: '#3498db',
    },
    status: {
        fontSize: 14,
        color: '#2ecc71',
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalInput: {
        color: 'black',
        width: 300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 10,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 80,
        right: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        borderRadius: 100,
        height: 70,
        width: 70,
        alignItems: 'center',
        backgroundColor: 'blue',
        // Shadow styles
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5, // This is for Android shadow
    },
    datePickerContainer: {
        color: 'black',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
});

export default HomeScreen;
