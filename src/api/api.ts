import type { ProductItem } from "../common/types"

export const getProducts = async ():Promise<ProductItem[]> => {
 
        const response = await fetch("http://localhost:3500/products")
        const responseJSON = await response.json()
    if (response.ok) {
        return responseJSON   
    } else {
        if(response.status === 404) throw new Error("404, Not found.")
        if(response.status === 500) throw new Error("500, Internal server error.")

        throw new Error("Something went wrong")
    }
    
          
    }