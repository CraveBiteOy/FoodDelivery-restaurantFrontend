export const drawerItemsMain = [
    {
      key: 'Restaurant',
      title: 'Restaurant',
      routes: [{nav: 'Drawer', routeName: 'Restaurant', title: 'Restaurant'}],
    },
    {
      key: 'Dish',
      title: 'Dish',
      routes: [{nav: 'Drawer', routeName: 'Dish', title: 'Dish'}],
    },
    {
      key: 'Orders',
      title: 'Orders',
      routes: [
        {nav: 'Drawer', routeName: 'ActiveOrders', title: 'In-progress Orders'},
        {nav: 'Drawer', routeName: 'CompletedOrders', title: 'Completed Orders'},
      ],
    },
    {
      key: 'PersonalStack',
      title: 'Your Profile',
      routes: [{nav: 'Drawer', routeName: 'PersonalProfile', title: 'Personal Profile'}],
    },
  ];