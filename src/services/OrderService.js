import { collection, addDoc, doc, writeBatch, serverTimestamp, query, where, getDocs, getDoc } from 'firebase/firestore';

export default class OrderService {
    static async fetchOrders(profileId) {
        const db = window.db; // Передбачається, що Firestore ініціалізовано в window.db

        try {
            // Отримуємо всі замовлення для конкретного профіля
            const ordersRef = collection(db, 'orders');
            const ordersQuery = query(ordersRef, where('profileId', '==', profileId));
            const ordersSnapshot = await getDocs(ordersQuery);

            const orders = [];
            for (const orderDoc of ordersSnapshot.docs) {
                const order = orderDoc.data();
                order.id = orderDoc.id;

                // Отримуємо всі елементи замовлення для конкретного замовлення
                const orderItemsRef = collection(db, 'order_items');
                const orderItemsQuery = query(orderItemsRef, where('orderId', '==', order.id));
                const orderItemsSnapshot = await getDocs(orderItemsQuery);

                const orderItems = [];
                for (const itemDoc of orderItemsSnapshot.docs) {
                    const orderItem = itemDoc.data();
                    orderItem.id = itemDoc.id;

                    // Отримуємо дані продукту для кожного елемента замовлення
                    const productRef = doc(db, 'products', orderItem.productId);
                    const productDoc = await getDoc(productRef);
                    if (productDoc.exists()) {
                        orderItem.product = productDoc.data();
                        orderItem.product.id = productDoc.id;
                    }

                    orderItems.push(orderItem);
                }

                order.items = orderItems;
                orders.push(order);
            }

            return orders;
        } catch (error) {
            console.error("Error fetching orders: ", error);
            return { success: false, error: error.message };
        }
    }
    static async makeOrder({ city, post, postNumber, products, profile, clientName }) {
        const db = window.db; // Передбачається, що Firestore ініціалізовано в window.db

        const orderData = {
            orderDate: serverTimestamp(),
            profileId: profile.id,
            total: products.reduce((total, product) => total + product.price * product.quantity, 0),
            complete: false,
            city: city,
            clientName,
            clientPhone: profile.phone,
            department: postNumber,
            post: post
        };

        try {
            // Починаємо транзакцію
            const batch = writeBatch(db);

            // Додаємо замовлення до колекції orders
            const orderRef = await addDoc(collection(db, 'orders'), orderData);
            const orderId = orderRef.id;

            // Додаємо елементи замовлення до колекції order_items
            products.forEach(product => {
                const orderItemData = {
                    orderId: orderId,
                    productId: product.id,
                    quantity: product.quantity
                };
                const orderItemRef = doc(collection(db, 'order_items'));
                batch.set(orderItemRef, orderItemData);
            });

            // Застосовуємо транзакцію
            await batch.commit();

            return true;
        } catch (error) {
            console.error("Error creating order: ", error);
            return false;
        }
    }
}