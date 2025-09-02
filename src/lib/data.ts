import { Product } from '@/lib/products';

async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  
  if (!process.env.WORDPRESS_API_URL) {
    throw new Error('WORDPRESS_API_URL is not configured in .env file');
  }

  const res = await fetch(process.env.WORDPRESS_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    // Use Next.js caching features
    next: { revalidate: 10 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// Helper function to transform GraphQL product data into our Product type
function transformProduct(productNode: any): Product {
    const image = productNode.image?.sourceUrl || 'https://placehold.co/400x400';
    return {
        name: productNode.name,
        slug: productNode.slug,
        price: parseFloat(productNode.price?.replace(/[^0-9.-]+/g,"")) || 0,
        image: image,
        hint: productNode.name.toLowerCase(), // Generate a hint from the name
        category: productNode.productCategories?.nodes[0]?.name || 'Uncategorized',
        description: productNode.description || 'No description available.',
        featured: productNode.featured || false,
    };
}


export async function getProducts(): Promise<Product[]> {
  const data = await fetchAPI(`
    query AllProducts {
      products(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          name
          slug
          description
          featured
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price(format: RAW)
          }
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  `);
  
  if (!data.products.nodes) {
    return [];
  }

  return data.products.nodes.map(transformProduct);
}


export async function getProductBySlug(slug: string): Promise<Product | null> {
    const data = await fetchAPI(
      `
      query ProductBySlug($id: ID!) {
        product(id: $id, idType: SLUG) {
          name
          slug
          description
          featured
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price(format: RAW)
          }
          productCategories {
            nodes {
              name
            }
          }
        }
      }
      `,
      {
        variables: { id: slug },
      }
    );
  
    if (!data.product) {
        return null;
    }

    return transformProduct(data.product);
}
