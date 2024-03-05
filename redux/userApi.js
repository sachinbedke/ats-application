import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
// import { fromUnixTime, differenceInHours } from "date-fns"
import { db } from "./config"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["todos"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query({
                queryFn: async todoData => {
                    try {
                        const collectionRef = collection(db, "todos")
                        const q = query(collectionRef, where("id", "==", todoData.id), where("status", "==", todoData.status))
                        const { docs } = await getDocs(q)
                        const result = docs.map(item => {
                            // const x = fromUnixTime(item.createdAt.seconds)
                            // const h = differenceInHours(x, new Date())
                            return {
                                ...item.data(), id: item.id,
                                createdAt: item.data().createdAt.seconds,
                                completedAt: item.data().completedAt ? item.data().completedAt.seconds : ""

                            }
                        })
                        return { data: result }
                    } catch (error) {
                        return { error: error.message || "somthing went worng" }
                    }
                },
                providesTags: ["todos"]
            }),
            completeTodo: builder.mutation({
                queryFn: async id => {
                    try {
                        const docRef = doc(db, "todos", id)
                        await updateDoc(docRef, { status: "complete", completedAt: new Date() })

                        return { data: "Update Success" }
                    } catch (error) {
                        return { error: error.message || "somthing went worng" }
                    }
                },
                providesTags: ["todos"]
            }),

        }
    }
})

export const { useGetTodosQuery, useLazyGetTodosQuery, useCompleteTodoMutation } = userApi
