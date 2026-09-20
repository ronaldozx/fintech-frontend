
export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    monthlyIncome: number;
}

export interface User {
    id: number;
    email: string;
    fullName: string;
    birthDate: string;
    monthlyIncome: number;
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    loading?: boolean;
}