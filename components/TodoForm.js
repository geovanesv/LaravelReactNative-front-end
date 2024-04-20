import { useState } from "react";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

const TodoForm = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        if (text) {
            e.preventDefault();
            addTodo(text);
            setText('');
        }
    };

    return (
        <View style={{paddingHorizontal: 20}}>
            <TextInput 
                label='adicionar Tarefa'
                value={text}
                mode="outlined"
                activeOutlineColor="#eb5e28"
                onChangeText={text => setText(text)}
                right={
                    <TextInput.Icon 
                        icon='pencil' 
                        onPress={handleSubmit}
                        iconColor='#eb5e28'
                    />}
                onSubmitEditing={handleSubmit}
            />
        </View>
        
    )

}

export default TodoForm;