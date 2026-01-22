export async function createOrder(orderPayload) 
{
 await new Promise (resolve=>setTimeout(resolve,500));
 
 const shouldFail = false;
 if(shouldFail)
    {
        throw new Error('Order service unavailable');
    } 

    return{
        id: 'ORD' + Date.now(),
        ...orderPayload,
        orderTime:new Date().toISOString(),
    };
}