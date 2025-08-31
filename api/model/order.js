import prismacon from "../lib/prisma.js";
export async function getAllOrders() {
    return await prismacon.order.findMany();
}

export async function createOrder(data) {
    // First, get all product details including prices
    const getOrderItemsWithPrices = async () => {
        return await Promise.all(
            data.orderItems.map(async (item) => {
                const product = await prismacon.product.findUnique({
                    where: { id: item.productId }
                });
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                };
            })
        );
    };

    const calculateTotalAmount = (orderItemsWithPrices) => {
        return orderItemsWithPrices.reduce((sum, item) =>
            sum + (item.price * item.quantity), 0
        );
    };

    // Get order items with prices
    const orderItemsWithPrices = await getOrderItemsWithPrices();
    const calculatedTotal = calculateTotalAmount(orderItemsWithPrices);

    return await prismacon.order.create({
        data: {
            // Include other order fields here (userId, status, etc.)
            totalAmount: calculatedTotal,
            orderItems: {
                create: orderItemsWithPrices.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    });
}
export async function updateOrder(orderId, data) {
    // Check if order exists
    const existingOrder = await prismacon.order.findUnique({
        where: { id: orderId },
        include: { orderItems: true }
    });
    
    if (!existingOrder) {
        throw new Error(`Order with ID ${orderId} not found`);
    }

    // If orderItems are being updated, recalculate prices and total
    if (data.orderItems) {
        // Get product details with prices for new order items
        const getOrderItemsWithPrices = async () => {
            return await Promise.all(
                data.orderItems.map(async (item) => {
                    const product = await prismacon.product.findUnique({
                        where: { id: item.productId }
                    });
                    if (!product) {
                        throw new Error(`Product with ID ${item.productId} not found`);
                    }
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price
                    };
                })
            );
        };

        const calculateTotalAmount = (orderItemsWithPrices) => {
            return orderItemsWithPrices.reduce((sum, item) =>
                sum + (item.price * item.quantity), 0
            );
        };

        // Get order items with prices
        const orderItemsWithPrices = await getOrderItemsWithPrices();
        const calculatedTotal = calculateTotalAmount(orderItemsWithPrices);

        return await prismacon.order.update({
            where: { id: orderId },
            data: {
                ...data,
                totalAmount: calculatedTotal,
                orderItems: {
                    // Delete existing order items
                    deleteMany: {},
                    // Create new order items
                    create: orderItemsWithPrices.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });
    } else {
        // If no orderItems update, just update other fields
        return await prismacon.order.update({
            where: { id: orderId },
            data: data
        });
    }
}
