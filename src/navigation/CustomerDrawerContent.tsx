import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn';

function CustomDrawerContent(props : any) {
  const tw = useTailwind();
  const [mainDrawer, setMainDrawer] = useState<boolean>(true);
  const [filteredItems, setFilteredItems] = useState<any>([]);

  const toggleMainDrawer = () => {
    setMainDrawer(true);
    setFilteredItems([]);
  };

  const onItemParentPress = (key : any) => {
    const filteredMainDrawerRoutes = props.drawerItems.find((e : any) => {
      return e.key === key;
    });
    if (filteredMainDrawerRoutes.routes.length === 1) {
      const selectedRoute = filteredMainDrawerRoutes.routes[0];
      props.navigation.toggleDrawer();
      props.navigation.navigate(selectedRoute.nav, {
        screen: selectedRoute.routeName,
      });
    } else {
      setMainDrawer(false);
      setFilteredItems(filteredMainDrawerRoutes);
    }
  };

  const logOut = async () => props.navigation.navigate("LoginScreen");

  function renderMainDrawer() {
    return (
      <View>
        {props.drawerItems.map((parent: any) => (
          <View key={parent.key}>
            <TouchableOpacity
              key={parent.key}
              testID={parent.key}
              onPress={() => {
                onItemParentPress(parent.key);
              }}>
              <View style={styles.parentItem}>
                <Ionicons size={30} name={parent.iconName} color={"#f7691a"}></Ionicons>
                <Text style={[ styles.title, tw('ml-8')]}>{parent.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {renderLogoutBtn()}
      </View>
    );
  }

  function renderFilteredItemsDrawer() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => toggleMainDrawer()}
          style={styles.backButtonRow}>
          <Text style={[styles.backButtonText, styles.title, {fontSize: 14}]}>{'BACK'}</Text>
        </TouchableOpacity>
        {filteredItems.routes.map((route : any) => {
          return (
            <TouchableOpacity
              key={route.routeName}
              testID={route.routeName}
              onPress={() =>
                props.navigation.navigate(route.nav, {
                  screen: route.routeName,
                })
              }
              style={tw('flex-row items-center ml-10 my-4')}
            >
              <MaterialCommunityIcons size={30} name={route.iconName} color={"#f7691a"}></MaterialCommunityIcons>
              <Text style={[styles.title, tw('ml-4')]}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function renderLogoutBtn() {
    return (
      <View>
        <TouchableOpacity onPress={logOut} testID="customDrawer-logout">
          <View style={styles.parentItem}>
            <Entypo size={30} name='log-out' color={"#f7691a"}></Entypo>
            <Text style={[styles.title, tw('ml-8')]}>{'Log out'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.drawerContainer}>
      <SafeAreaView
        style={styles.container}
        // forceInset={{top: 'always', horizontal: 'never'}}
      >
        <View style={styles.centered}>
          <Image
            source={require("../assets/MicrosoftTeams-image.png")}
            style={styles.logo}
          />
        </View>
        {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 70,
  },
  drawerContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    width: "100%",
    zIndex: 1000,
  },
  centered: {
    alignItems: 'center',
    marginVertical: 20
  },
  parentItem: {
    marginLeft: 10,
    marginVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f7691a',
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    marginHorizontal: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7691a',
    textAlign: 'center',
  },
  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 17,
    paddingLeft: 3,
    borderBottomColor: '#f7691a',
    borderBottomWidth: 1,
  },
  backButtonText: {
    marginLeft: 10,
    color: '#f7691a',
  },
});

export default CustomDrawerContent;