import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

const useCustomFetch = (url, method = "GET", body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async (customUrl = url, customMethod = method, customBody = body) => {
        if (!customUrl) return;
        setLoading(true);
        setError(false);
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axiosInstance({
                method: customMethod,
                url: customUrl,
                data: customBody,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(true);
            return { isSuccess: false, message: "API 요청 실패" };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url && method === "GET") {
            fetchData();
        }
    }, [url, method]);

    return { data, loading, error, fetchData };
};

export default useCustomFetch;
