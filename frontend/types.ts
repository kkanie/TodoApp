import {ReactNode} from "react";

export type Todo = {
    _id: string,
    title: string,
    description: string,
    createdAt: ReactNode,
    status: boolean
}