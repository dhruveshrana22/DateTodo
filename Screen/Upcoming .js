import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TodoItems } from './Complet';

function TodoItem({ item, onEditPress, handleRemovePress }) {
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.infoText}>
                    Date: {moment(item.date).format('YYYY-MM-DD')}
                </Text>
                <Text style={[styles.infoText, { color: item.status === 'Completed' ? '#2ecc71' : '#e74c3c' }]}>
                    Status: {item.status}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function Upcoming() {
    const data = useSelector((state) => state.addNotesReducer.note);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const upcomingTodos = data.filter((item) => item.status === "Cancel" && item.date >= getCurrentDate());

    return (
        <View style={{ backgroundColor: "#A0AECD", flex: 1 }}>
            <FlatList
                data={upcomingTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoItems item={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#E6E2DD',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        elevation: 3,
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
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
});

export default Upcoming;
