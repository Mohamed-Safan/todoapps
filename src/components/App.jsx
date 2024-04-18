import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import AddForm from './AddForm/AddFormContainer';
import Item from './Item/ItemContainer';

const App = (props) => {
  const todoTasks = props.todos.filter((item) => item.state === 'todo');
  const completedTasks = props.todos.filter((item) => item.state === 'done');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Todo App</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.listView}>
          <Text style={styles.listTitle}>To Do</Text>
          {todoTasks.length !== 0 ? (
            <FlatList
              data={todoTasks}
              renderItem={({ item }) => <Item {...item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.emptyListText}>No to do tasks</Text>
          )}
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.listView}>
          <Text style={styles.listTitle}>Completed Tasks</Text>
          {completedTasks.length !== 0 ? (
            <FlatList
              data={completedTasks}
              renderItem={({ item }) => <Item {...item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.emptyListText}>No completed tasks</Text>
          )}
        </View>
      </View>
      
      <AddForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: 'black', 
    paddingVertical: 10,
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 10, 
  },
  listView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  },
  emptyListText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
  },
});

export default App;
