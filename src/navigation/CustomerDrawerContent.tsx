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

function CustomDrawerContent(props : any) {
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
                <Text style={[ styles.title]}>{parent.title}</Text>
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
              >
              <Text style={styles.title}>{route.title}</Text>
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
            <Text style={styles.title}>{'Log out'}</Text>
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
          {/* <Image
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={styles.logo}
          /> */}
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
    width: 100,
    height: 75,
  },
  drawerContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    zIndex: 1000,
  },
  centered: {
    alignItems: 'center',
  },
  parentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f7691a',
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    margin: 16,
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