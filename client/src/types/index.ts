export interface CovidData {
    id: number;
    idPasien: string;
    hasilTes: string;
    tanggalTes: string;
    statusVaksinasi: string;
    owner: string;
}

export interface NewCovidData {
    idPasien: string;
    hasilTes: string;
    tanggalTes: string;
    statusVaksinasi: string;
}

export interface User {
    username: string;
    address: string;
    isRegistered: boolean;
}

export interface LoginState {
    address: string;
    signature: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
}
