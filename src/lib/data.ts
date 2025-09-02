
import { Product } from '@/lib/products';

const API_URL = 'https://kokiyum.in/wp/graphql';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
        next: { revalidate: 10 } // Revalidate data every 10 seconds
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

function extractProducts(data: any): Product[] {
    return data.products.edges.map(({ node }: { node: any }) => {
        return {
            name: node.name,
            slug: node.slug,
            price: parseFloat(node.price?.replace(/[^0-9.-]+/g,"")) || 0,
            image: node.image?.sourceUrl,
            hint: 'product image',
            category: node.productCategories?.edges[0]?.node.name || 'Uncategorized',
            description: node.description || '',
            featured: node.featured || false,
        };
    });
}

function extractProduct(data: any): Product {
     const { node } = data.product;
     return {
        name: node.name,
        slug: node.slug,
        price: parseFloat(node.price?.replace(/[^0-9.-]+/g,"")) || 0,
        image: node.image?.sourceUrl,
        hint: 'product image',
        category: node.productCategories?.edges[0]?.node.name || 'Uncategorized',
        description: node.description || '',
        featured: node.featured || false,
    };
}


export async function getProducts(): Promise<Product[]> {
    const data = await fetchAPI(`
        query AllProducts {
            products {
                edges {
                    node {
                        name
                        slug
                        price
                        featured
                        image {
                            sourceUrl
                        }
                        productCategories {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                        ... on SimpleProduct {
                            description
                        }
                    }
                }
            }
        }
    `);
    return extractProducts(data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const data = await fetchAPI(`
        query ProductBySlug($id: ID!) {
            product(id: $id, idType: SLUG) {
                 node: product(id: $id, idType: SLUG) {
                    name
                    slug
                    price
                    featured
                    image {
                        sourceUrl
                    }
                    productCategories {
                        edges {
                            node {
                                name
                            }
                        }
                    }
                    ... on SimpleProduct {
                        description
                    }
                }
            }
        }
    `, {
        variables: { id: slug }
    });
    if (!data.product) return null;
    return extractProduct(data);
}
