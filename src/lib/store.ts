import { ProductSlice } from "@/interfaces/crateProductSlice.interface"
import { cartSlice } from "@/interfaces/createCartSlice.interface"
import {SetState, create} from "zustand"
import { createCartSlice } from "./slices/createCartSlice"
import { AuthStoreActions, AuthStoreState } from "@/interfaces/authStore.interface"

type StoreState =  cartSlice

// items and product store
export const useAppStore = create<StoreState>()((...a) => ({
    ...createCartSlice(...a)
}))

//  authentication store
export const useAuthenticationStore = create<AuthStoreState & AuthStoreActions>((set: SetState<AuthStoreState>) => ({
    isAuthenticated: false, 
    setIsAuthenticated: (value) => set(() => ({ isAuthenticated: value })),
    setUserDetails: (userDetails) => set(() => ({ userDetails })),
}))

