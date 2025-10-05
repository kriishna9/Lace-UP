import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@shared/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  total: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'MOVE_TO_CART'; payload: { product: Product; size: string; color: string } };

const initialState: CartState = {
  items: [],
  wishlist: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
                item.selectedSize === size && 
                item.selectedColor === color
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity, selectedSize: size, selectedColor: color }];
      }

      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total, itemCount };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => 
        !(item.product.id === action.payload)
      );
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId });
      }

      const newItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };

    case 'ADD_TO_WISHLIST': {
      const product = action.payload;
      if (state.wishlist.find(item => item.id === product.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, product] };
    }

    case 'REMOVE_FROM_WISHLIST': {
      const productId = action.payload;
      const newWishlist = state.wishlist.filter(item => item.id !== productId);
      return { ...state, wishlist: newWishlist };
    }

    case 'MOVE_TO_CART': {
      const { product, size, color } = action.payload;
      const newWishlist = state.wishlist.filter(item => item.id !== product.id);
      const stateAfterWishlistRemoval = { ...state, wishlist: newWishlist };
      
      return cartReducer(stateAfterWishlistRemoval, {
        type: 'ADD_TO_CART',
        payload: { product, size, color }
      });
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product, size: string, color: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const moveToCart = (product: Product, size: string, color: string) => {
    dispatch({ type: 'MOVE_TO_CART', payload: { product, size, color } });
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.some(item => item.id === productId);
  };

  const isInCart = (productId: string) => {
    return state.items.some(item => item.product.id === productId);
  };

  const value = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
