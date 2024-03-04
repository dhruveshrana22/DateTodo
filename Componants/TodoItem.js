// TodoItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

function TodoItem({ item, onEditPress, handleRemovePress }) {
    return (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.infoText}>
                    Date: {moment(item.date).format('YYYY-MM-DD')}
                </Text>
                <Text style={[styles.infoText, { color: item.status === 'Completed' ? '#2ecc71' : '#e74c3c' }]}>
                    Status: {item.status}
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

const styles = StyleSheet.create({
    // Your styles for TodoItem component
    // ...

    // Example styles (replace with your own):
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        elevation: 3,
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
});

export default TodoItem;
