export type Store = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
};

export type Stores = Store[];

type Meta = {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
};

export type Product = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  storeName: string;
  _id: string;
};

export interface StoreNProducts {
  meta: Meta;
  store: Store;
  products: Product[];
}

export interface CartProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderPayload {
  store: string;
  username: string;
  products: CartProduct[];
  totalPrice: number;
}

export interface IOrderProduct {
  image: string;
  name: string;
  price: number;
  quantity: number;
}
