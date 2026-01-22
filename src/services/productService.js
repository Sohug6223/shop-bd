import {  products as staticProducts } from "../../starting-code/data/products";

export async function fetchProducts(searchTerm='') {
    await new Promise(resolve=> setTimeout(resolve,400));

    const term = searchTerm.toLowerCase();

    return staticProducts.filter(product=>
        product.name.toLowerCase().includes(term)
    );
    
}