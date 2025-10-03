import axios from "axios";
import { useMemo } from "react";

function useAxios() {
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: import.meta.env.VITE_API_URL_BASE,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }, []);

    return { axiosInstance };
}

export default useAxios;
