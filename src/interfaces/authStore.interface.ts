export interface AuthStoreState {
    isAuthenticated: boolean,
    userDetails?: any
}

export interface AuthStoreActions {
    setIsAuthenticated: (value: boolean) => void;
    setUserDetails: (userDetails: any | null) => void;
    
}