import { setDefaultClient } from "micro-graphql-react";
import { mainClient, refClient } from "../graphql-clients";

// loggedIn: true || false
// type: main || ref
const setProductsClient = (loggedIn, type) => {
    type === 'main' ? 
    setDefaultClient(mainClient(loggedIn))
    :
    setDefaultClient(refClient(loggedIn))
}

export const ApiService = {
    setProductsClient
}
