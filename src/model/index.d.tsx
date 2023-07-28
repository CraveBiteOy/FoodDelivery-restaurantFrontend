

export interface USER {
    id: number,
    username: string,
    firstname: string,
    surename: string,
    roles: string[],
    longitude: number |null,
    latitude: number |null,
    imageurl: string | null
}

export interface declaredStateUser  {
    authUser: USER | {},
    userUpdateStatus: boolean,
    userUpdated: USER | {},
    message: string | null,
    authSuccess: boolean,
    authError: boolean
}

export interface ACTION {
    type: string,
    payload?: any
}

export interface LoginForm {
    username: string,
    password: string,
    longitude?: number |null,
    latitude?: number |null
}

export interface UserRegisterForm {
    username: string,
    firstname: string,
    surename: string,
    password: string,
    longitude: number,
    latitude: number,
    imageurl?: string
}

export interface CHANGEPASSWORD {
    password: string,
    newPassword: string,
    confirmPassword: string
}

export interface RESTAURANT {
    id: number,
    name: string,
    address: string,
    imageurl: string | null,
    owner: number,
    city: string,
    zipcode: string,
    latitude: number,
    longitude: number,
    rating: number,
    cookingTime: number,
    distance: number,
    estimatedTime: number | null,
    cratedDate: string,
    updatedDate: string
}

export interface declaredStateRestaurant  {
    restaurant: RESTAURANT | {},
    restaurants: RESTAURANT[] | [],
    message: string | null,
    restaurantSuccess: boolean,
    restaurantError: boolean
}

export interface DISH {
    id: number,
    name: string,
    imageurl: string | null,
    description: string,
    price: number,
    availability: boolean,
    restaurant: number,
    cratedDate: string,
    updatedDate: string
}

export interface declaredStateDish  {
    dish: DISH | {},
    dishes: DISH[] | [],
    message: string | null,
    dishSuccess: boolean,
    dishError: boolean
}

export interface BASKET {
    id: number,
    quantity: number,
    total: number,
    restaurant: number,
    customer: number
}


export interface declaredStateBasket  {
    basket: BASKET | {},
    message: string | null,
    basketSuccess: boolean,
    basketError: boolean
}

export interface BASKETDISH {
    id: number,
    quantity: number,
    dish: DISH,
    basket: number
}

export interface declaredStateBasketDish  {
    basketDish: BASKETDISH | {},
    basketDishes: BASKETDISH[] | [],
    message: string | null,
    basketDishSuccess: boolean,
    basketDishError: boolean
}

export interface CUSTOMER {
    id: number,
    user: USER
}

export interface declaredStateCustomer  {
    customer: CUSTOMER | {},
    message: string | null,
    customerSuccess: boolean,
    customerError: boolean
}

export enum AVAILABLE {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export enum NAVIGATION_MODE {
    CAR = "CAR",
    BICYCLE = "BICYCLE"
}

export enum ORDER_STATUS {
    NEW = "NEW",
    OWNER_REJECTED ="OWNER_REJECTED",
    COOKING = "COOKING",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    COURIER_ACCEPTED = "COURIER_ACCEPTED",
    COURIER_REJECTED = "COURIER_REJECTED",
    PICKED_UP = "PICKED_UP",
    COMPLETED = "COMPLETED"
}

export interface COURIER {
    id: number,
    user: USER,
    status: AVAILABLE,
    available: boolean
    mode: NAVIGATION_MODE
}

export interface ORDER {
    id: number,
    customer: CUSTOMER,
    restaurant: RESTAURANT,
    courier: COURIER,
    status: ORDER_STATUS,
    total: number,
    deliveryFee: number,
    finalPrice: number,
    quantity: number,
    note: string,
    d2Distance: number,
    totalTime: number,
    toLongitude: number,
    toLatitude: number,
    fromLongitude: number,
    fromLatitude: number,
    address: string,
    zipcode: string,
    city: string
    createdDate: string,
    updatedDate: string
}

export interface declaredStateOrder  {
    order: ORDER | {},
    orders: ORDER[] | []
    message: string | null,
    orderSuccess: boolean,
    orderError: boolean
}

export interface ORDER_REQUEST {
    basketID: number,
    address?: string,
    zipcode?: string,
    city?: string,
    note?: string,
    toLatitude?: number,
    toLongitude?: number
}

export interface ORDERDISH {
    id: number,
    quantity: number,
    dish: DISH,
    order: number
}
export interface declaredStateOrderDish  {
    orderDish: ORDERDISH | {},
    orderDishes: ORDERDISH[] | []
    message: string | null,
    orderDishSuccess: boolean,
    orderDishError: boolean
}

export interface ImageData {
    image: string
}

export interface OWNER {
    id: number,
    user: USER
}

export interface declaredStateOwner  {
    owner: OWNER | {}
    message: string | null,
    ownerSuccess: boolean,
    ownerError: boolean
}

export interface RESTAURANT_CREATE {
    name: string,
    address: string,
    imageurl: string,
    city: string,
    zipcode: string,
    cookingTime: number
}

export interface DISH_CREATE {
    name: string,
    description: string,
    price: number,
    restaurant: number,
    imageurl?: string
}