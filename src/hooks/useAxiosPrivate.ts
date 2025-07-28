'use client'

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "@/config/axios";


const useAxiosPrivate = () => {
    
    const refresh = useRefreshToken();
    const { auth, setAuth, logOut } = useAuth();

    useEffect(() => {
        // interceptor is like middlewar of axios api, can modify req and res
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                // console.log("no access token")
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true; // adding 'sent' property

                    try {
                        // console.log("request for access token")
                    const newAccessToken = await refresh();

                    // console.log("new Access token: ", newAccessToken)

                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    setAuth(prev => {
                        return {
                            ...prev,
                            accessToken: newAccessToken,
                        }
                    })

                    return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.log("refreshError:", refreshError)
                        logOut()
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, refresh, logOut, setAuth]);

    return axiosPrivate;
};

export default useAxiosPrivate;