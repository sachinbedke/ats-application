import * as React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { BottomNavigation, Text, Card, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCompleteTodoMutation, useGetTodosQuery, useLazyGetTodosQuery } from '../redux/userApi';
import { List, MD3Colors } from "react-native-paper"
import { logout } from '../redux/authSlice';
import { fromUnixTime, differenceInHours, format, formatDistance, differenceInMinutes, differenceInSeconds, addHours } from "date-fns"
import { useState } from 'react';
import { useEffect } from 'react';

const TodoRoute = () => {
    const [allTodos, setAllTodos] = useState([])
    let timer
    const { user } = useSelector(state => state.auth)
    const [toggle, setToggle] = useState(false)

    const { data, isLoading, } = useGetTodosQuery({ id: user && user.uid, status: "pending" })
    const [getFn] = useLazyGetTodosQuery()

    const [completeFn] = useCompleteTodoMutation()
    useEffect(() => {
        if (data) {
            setAllTodos(data)
        }
        return () => clearInterval(timer)
    }, [data])
    return <>
        {/* <ScrollView refreshControl={<RefreshControl refreshing={isLoading}
        onRefresh={e => getFn(user.uid)} />}>
        <View style={{ margin: 30 }}>

            {
                data && data.map(item => <Card style={{
                    backgroundColor: `${item.color}`, marginTop: 5
                }}>
                    <Card.Content>
                        <Text variant="titleLarge">{item.task}</Text>
                        <Text variant="bodyMedium">{item.priority}</Text>
                        <Text variant="bodyMedium">{item.team}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode='contained'>Complete</Button>
                    </Card.Actions>
                </Card>)
            }

        </View>
    </ScrollView> */}

        <ScrollView
            horizontal
            contentContainerStyle={{ margin: 20, flex: 1 }}
            refreshControl={<RefreshControl refreshing={isLoading}
                onRefresh={e => getFn({ id: user.uid, status: "pending" })} />} >
            <FlatList
                data={allTodos}
                renderItem={({ item }) => {
                    const x = fromUnixTime(item.createdAt)
                    const h = format(differenceInHours(x, new Date()), "H:m")
                    const futureDate = addHours(x, 24)
                    const diffH = differenceInHours(futureDate, new Date())
                    const diffM = differenceInMinutes(futureDate, new Date()) % 60
                    const diffS = differenceInSeconds(futureDate, new Date()) % 60
                    timer = setInterval(() => {
                        setToggle(!toggle)
                    }, 1000);
                    return <Card style={{
                        backgroundColor: `${item.color}`, marginTop: 5
                    }}>
                        <Card.Content>
                            <Text variant="displayLarge">{item.task}</Text>
                            <Text variant="bodyMedium">{item.priority}</Text>
                            <Text variant="bodyMedium">{item.team}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={e => completeFn(item.id)} mode='contained'>Complete</Button>
                            {
                                h < -24 && <Button mode='contained' >Delayed</Button>
                            }
                            <Text>{diffH}:{diffM}:{diffS}</Text>
                        </Card.Actions>
                    </Card>
                }
                } />
        </ScrollView>
    </>
}

const SettingRoute = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return <>
        <List.Section style={{ margin: 20 }}>
            <List.Subheader>Profile</List.Subheader>
            <List.Item title={user && user.email} left={() => <List.Icon icon="account" />} />
            <List.Item
                title={user && user.uid}
                left={() => <List.Icon color={MD3Colors.tertiary70} icon="security" />}
            />

        </List.Section >
        <Button onPress={e => dispatch(logout())} mode='contained'>Logout</Button>
    </>
}
const CompletedRoute = () => {
    const { user } = useSelector(state => state.auth)

    const { data, isLoading, } = useGetTodosQuery({ id: user.uid, status: "complete" })
    const [getFn] = useLazyGetTodosQuery()
    const [completeFn] = useCompleteTodoMutation()
    return <>
        <ScrollView
            horizontal
            contentContainerStyle={{ margin: 20, flex: 1 }}
            refreshControl={<RefreshControl refreshing={isLoading}
                onRefresh={e => getFn({ id: user.uid, status: "complete" })} />} >
            <FlatList
                data={data}
                renderItem={({ item }) => <Card style={{
                    backgroundColor: `${item.color}`, marginTop: 5
                }}>
                    <Card.Content>
                        <Text variant="titleLarge">{item.task}</Text>
                        <Text variant="bodyMedium">{item.priority}</Text>
                        <Text variant="bodyMedium">{item.team}</Text>
                    </Card.Content>

                </Card>} />
        </ScrollView>
    </>
}



const Home = ({ navigation }) => {
    const { user } = useSelector(state => state.auth)
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'todos', title: 'Todos', focusedIcon: 'pencil', unfocusedIcon: 'pencil-outline' },
        { key: 'completeTodos', title: 'Complete', focusedIcon: 'check-circle', unfocusedIcon: 'check-circle-outline' },
        { key: 'settins', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: "cog-outline" },
        ,
    ]);

    const renderScene = BottomNavigation.SceneMap({
        todos: TodoRoute,
        completeTodos: CompletedRoute,
        settins: SettingRoute,

    });
    React.useEffect(() => {
        if (!user) {
            navigation.navigate("login")
        }
    }, [user])
    return <>
        <SafeAreaProvider>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </SafeAreaProvider>
    </>
};

export default Home;