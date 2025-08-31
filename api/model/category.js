import prismacon from "../lib/prisma.js";
export async function getAllCategories() {
    return await prismacon.category.findMany();
}

export async function createCategory(data) {
    return await prismacon.category.create({
        data,
    });
}
export async function updateCategory(data) {
    return await prismacon.category.update({
        where: { id: data.id },
        data,
    });
}
export async function deleteCategory(id) {
    return await prismacon.category.delete({
        where: { id: parseInt(id) },
    });
}