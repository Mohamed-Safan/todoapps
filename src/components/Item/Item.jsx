import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from './ItemStyles';
import TrashIcon from '../../assets/trashIcon.svg';
import CheckboxUnchecked from '../../assets/checkboxUnchecked.svg';
import CheckboxChecked from '../../assets/checkboxChecked.svg';
import EditIcon from '../../assets/editicon.svg';
import { useDispatch } from 'react-redux';
import { changeTodoState, editTodo, saveEditedTodo, cancelEditing, trashTodo } from '../../state/modules/app';

const Item = (props) => {
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState(props.text);

  const handleSaveEdit = () => {
    dispatch(saveEditedTodo({ id: props.id, newText: editedText }));
  };

  const handleCancelEdit = () => {
    dispatch(cancelEditing(props.id));
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable
        style={styles.itemCheckbox}
        onPress={() => dispatch(changeTodoState(props.id))}
        hitSlop={10}
      >
        {props.state === 'todo' ? (
          <CheckboxUnchecked height={20} />
        ) : (
          <CheckboxChecked style={styles.itemCheckboxCheckedIcon} height={20} />
        )}
      </Pressable>
      {props.isEditing ? (
        <TextInput
          style={styles.editTextInput}
          value={editedText}
          onChangeText={setEditedText}
          onBlur={handleSaveEdit}
          autoFocus
        />
      ) : (
        <>
          <Text
            style={[
              styles.itemText,
              props.state === 'done' && styles.itemTextChecked,
            ]}
          >
            {props.text}
          </Text>
          <Pressable
            style={[
              styles.trashButton,
              props.state === 'done' && styles.trashButtonDone,
            ]}
            onPress={() => dispatch(trashTodo(props.id))}
            hitSlop={10}
          >
            <TrashIcon height={20} />
          </Pressable>
          <Pressable
            style={styles.editButton}
            onPress={() => dispatch(editTodo(props.id))}
            hitSlop={10}
          >
            <EditIcon height={20} />
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Item;
