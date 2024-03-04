import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TodoItem, TodoItems } from './Complet';



function Due() {
    const data = useSelector((state) => state.addNotesReducer.note);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const calculateDaysDifference = (date) => {
        const currentDate = moment(getCurrentDate());
        const taskDate = moment(date);
        const daysDifference = taskDate.diff(currentDate, 'days');
        return daysDifference;
    };

    const formatDueStatus = (daysDifference) => {
        if (daysDifference === 0) {
            return 'Due (today)';
        } else if (daysDifference < 0) {
            return `Due ${Math.abs(daysDifference)} days ago`;
        } else {
            return `Due (in ${daysDifference} days)`;
        }
    };

    const dueTodos = data.filter((item) => {
        const daysDifference = calculateDaysDifference(item.date);
        return item.status === 'D' || daysDifference < 0;
    });

    return (
        <View style={{ backgroundColor: "#A0AECD", flex: 1 }}>
            <FlatList
                data={dueTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoItems
                        item={{
                            ...item,
                            status: formatDueStatus(calculateDaysDifference(item.date)),
                        }}
                    />
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

export default Due;
