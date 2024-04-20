import { useState } from "react";
import { Checkbox, Icon, Divider } from "react-native-paper";
import { SwipeRow } from 'react-native-swipe-list-view';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from "react-native";

const TodoItem = ({ todo, remove, toggle }) => {
    const [checked, setChecked] = useState(false);

    const removeTodo = () => {
        remove(todo.id);
    };

    const toggleTodo = () => {
        toggle(todo.id);
        setChecked(!checked);
    }

    return (
        <SwipeRow rightOpenValue={-50}>
            <View style={styles.deleteView}>
                <TouchableOpacity
                    style={styles.deleteTouchable}
                    onPress={() =>
                        Alert.alert(
                            'Apagar Tarefa?',
                            `Tem certeza de que deseja excluir a tarefa "${todo.text}"?`,
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () =>
                                        removeTodo()
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                >
                    <Text style={styles.deleteText}>
                        <Icon source='delete-outline' size={30} color="white" />
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Checkbox.Item
                    label={todo.text}
                    status={todo.completed ? 'checked' : 'unchecked'}
                    onPress={toggleTodo}
                    style={{backgroundColor: 'white'}}
                    position="leading"
                    labelStyle={{textAlign: 'left', paddingLeft: 10}}
                    labelVariant="titleLarge"
                    color="#eb5e28"
                    uncheckedColor="#eb5e28"
                />
                <Divider horizontalInset />
            </View>
        </SwipeRow>
    )
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: '#eb5e28',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 50
    },
})

export default TodoItem;