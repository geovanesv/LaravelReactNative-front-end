import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Divider, SegmentedButtons } from 'react-native';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Função para carregar os Todos da API quando o componente é montado
        loadTodos();
    }, []);

    const FILTER_MAP = {
        All: () => true,
        Active: (todo) => !todo.completed,
        Completed: (todo) => todo.completed
    };

    const loadTodos = async () => {
        try {
            const response = await axios.get('/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Erro ao carregar os Todos:', error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Erro ao excluir o Todo:', error);
        }
    };

    const addTodo = async (text) => {
        try {
            const response = await axios.post('/create', { name: text, description: '' });
            setTodos((prevTodos) => [...prevTodos, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar o Todo:', error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const todoToUpdate = todos.find((todo) => todo.id === id);
            const response = await axios.put(`/update/${id}`, { name: todoToUpdate.name, description: todoToUpdate.description, completed: !todoToUpdate.completed });
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? response.data : todo)));
        } catch (error) {
            console.error('Erro ao atualizar o Todo:', error);
        }
    };

    // Renderização dos Todos
    const taskList = todos
        .filter(FILTER_MAP[filter])
        .map((todo) => (
            <TodoItem
                todo={todo}
                key={todo.id}
                remove={removeTodo}
                toggle={toggleTodo}
            />
        ));

    return (
        <View style={{ marginTop: 40, height: '93%' }}>
            <Text style={styles.heading}>ToDo List</Text>
            <TodoForm addTodo={addTodo} />
            {todos.length !== 0 ? (
                <ScrollView>
                    {taskList}
                </ScrollView>
            ) : (
                <ScrollView style={{ paddingTop: 50 }}>
                    <Text style={{ textAlign: 'center' }}>Sua lista de tarefas está vazia</Text>
                </ScrollView>
            )}
            <Divider />
            <View style={styles.bottomBtns}>
                <SegmentedButtons
                    value={filter}
                    onValueChange={setFilter}
                    buttons={[
                        { value: 'All', label: 'All' },
                        { value: 'Active', label: 'Active' },
                        { value: 'Completed', label: 'Completed' },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        marginBottom: 10,
        paddingTop: 30,
        paddingBottom: 30,
        paddingHorizontal: 35,
        backgroundColor: '#eb5e28',
        color: 'white',
        textAlign: 'center'
    },
    bottomBtns: {
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 15
    }
});

export default TodoList;

