import { collection, query, where, getDocs } from "firebase/firestore";

export default class ProductsService {
    static async searchProductsByNameAndDescription(searchString) {
        const productsRef = collection(window.db, 'products');
        // Запит для пошуку в полі 'name'
        const nameQuery = query(
            productsRef,
            where('name', '>=', searchString),
            where('name', '<=', searchString + '\uf8ff')
        );

        // Запит для пошуку в полі 'description'
        const descriptionQuery = query(
            productsRef,
            where('description', '>=', searchString),
            where('description', '<=', searchString + '\uf8ff')
        );

        // Виконання запитів
        const [nameSnapshot, descriptionSnapshot] = await Promise.all([
            getDocs(nameQuery),
            getDocs(descriptionQuery)
        ]);

        const results = new Set();

        // Додавання результатів з запиту по 'name'
        nameSnapshot.forEach((doc) => {
            results.add(doc.id);
        });

        // Додавання результатів з запиту по 'description'
        descriptionSnapshot.forEach((doc) => {
            results.add(doc.id);
        });

        // Отримання унікальних документів
        const uniqueResults = [];
        results.forEach((id) => {
            const doc = nameSnapshot.docs.find((doc) => doc.id === id) || descriptionSnapshot.docs.find((doc) => doc.id === id);
            if (doc) {
                uniqueResults.push(doc.data());
            }
        });

        return uniqueResults;
    }
}