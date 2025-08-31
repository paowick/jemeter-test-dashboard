import bodyParser from "body-parser";
import express from "express"
import cors from "cors"
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "./model/category.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "./model/product.js";
import { createOrder, getAllOrders, updateOrder } from "./model/order.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});


app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/categories", async (req, res) => {
    try {

        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/categories", async (req, res) => {
    try {
        const updatedCategory = await updateCategory(req.body);
        res.json(updatedCategory);
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/categories/:id", async (req, res) => {
    try {
        await deleteCategory(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/products", async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/products", async (req, res) => {
    try {
        const products = await createProduct(req.body);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/products", async (req, res) => {
    try {
        const products = await updateProduct(req.body);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/orders", async (req, res) => {
    try {
        const orders = await createOrder(req.body);
        res.json(orders);
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put("/orders/:id", async (req, res) => {
    try {
        const orders = await updateOrder(parseInt(req.params.id), req.body);

        res.json(orders);
    }
    catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});