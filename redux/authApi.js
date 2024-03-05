import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./config"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                queryFn: async userData => {
                    try {
                        const { user } = await signInWithEmailAndPassword(auth, userData.email, userData.password)
                   
                        return {
                            data: {
                                email: user.email,
                                uid: user.uid
                            }
                        }
                    } catch (error) {
                        return { error: error.message || "Invalid Creadentional" }
                    }
                },
                providesTags: ["tagName"]
            }),
            logout: builder.mutation({
                queryFn: async userData => {
                    try {
                        await signOut(auth)
                        return { data: "SignOut Success" }
                    } catch (error) {
                        return { error: error.message || "Invalid Creadentional" }
                    }
                },
                providesTags: ["tagName"]
            }),


        }
    }
})

export const { useLoginMutation, useLogoutMutation } = authApi
