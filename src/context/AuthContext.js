import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    getAuth,
    onAuthStateChanged,
} from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(
            auth,
            currentUser => {
                setUser(currentUser);
                setLoading(false);
            },
        );

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};