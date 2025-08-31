import prismacon from "../lib/prisma.js";
export async function getAllProducts() {
    return await prismacon.product.findMany();
}

export async function createProduct(data) {
    return await prismacon.product.create({
        data,
    });
}
export async function updateProduct(data) {
    return await prismacon.product.update({
        where: { id: data.id },
        data,
    });
}
export async function deleteProduct(id) {
    return await prismacon.product.delete({
        where: { id: parseInt(id) },
    });
}