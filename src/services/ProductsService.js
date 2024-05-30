import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export default class ProductsService {
    static async fetch() {
        let productsRef = collection(window.db, 'products');
        let productFiltersRef = collection(window.db, 'product_filters');

        const [productsSnapshot, filtersSnapshot] = await Promise.all([
            getDocs(productsRef),
            getDocs(productFiltersRef)
        ]);

        const products = [];
        const productFilters = {};

        for (const doc of filtersSnapshot.docs) {
            const filter = doc.data();
            filter.id = doc.id;
            if (!productFilters[filter.productId]) {
                productFilters[filter.productId] = [];
            }
            productFilters[filter.productId].push(filter);
        }

        for (const doc of productsSnapshot.docs) {
            const product = doc.data();
            product.id = doc.id;

            product.filters = productFilters[product.id] || [];

            if (product.image) {
                const imageRef = ref(window.storage, product.image);
                product.image = await getDownloadURL(imageRef);
            }

            products.push(product);
        }

        return products;
    }
    static async searchProductsByNameAndDescription(searchString) {
        const productsRef = collection(window.db, 'products');
        const nameQuery = query(
            productsRef,
            where('name', '>=', searchString),
            where('name', '<=', searchString + '\uf8ff')
        );

        const descriptionQuery = query(
            productsRef,
            where('description', '>=', searchString),
            where('description', '<=', searchString + '\uf8ff')
        );

        const [nameSnapshot, descriptionSnapshot] = await Promise.all([
            getDocs(nameQuery),
            getDocs(descriptionQuery)
        ]);

        const results = new Set();

        nameSnapshot.forEach((doc) => {
            results.add(doc.id);
        });

        descriptionSnapshot.forEach((doc) => {
            results.add(doc.id);
        });

        const uniqueResults = [];
        results.forEach((id) => {
            const doc = nameSnapshot.docs.find((doc) => doc.id === id) || descriptionSnapshot.docs.find((doc) => doc.id === id);
            if (doc) {
                uniqueResults.push({ ...doc.data(), id: doc.id });
            }
        });

        return uniqueResults;
    }
}