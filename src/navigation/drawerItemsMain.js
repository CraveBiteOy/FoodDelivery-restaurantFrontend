export const drawerItemsMain = [
    {
      key: 'Restaurant',
      title: 'Restaurant',
      iconName: 'home',
      routes: [{nav: 'Drawer', routeName: 'Restaurant', title: 'Restaurant'}],
    },
    {
      key: 'Dish',
      title: 'Dish',
      iconName: 'fast-food',
      routes: [{nav: 'Drawer', routeName: 'Dish', title: 'Dish'}],
    },
    {
      key: 'Orders',
      title: 'Orders',
      iconName: 'book-sharp',
      routes: [
        {nav: 'Drawer', routeName: 'ActiveOrders', title: 'In-progress Orders', iconName: 'playlist-edit',},
        {nav: 'Drawer', routeName: 'CompletedOrders', title: 'Completed Orders', iconName: 'playlist-check',},
      ],
    },
    {
      key: 'PersonalStack',
      title: 'Your Profile',
      iconName: 'person-sharp',
      routes: [{nav: 'Drawer', routeName: 'PersonalProfile', title: 'Personal Profile'}],
    },
  ];