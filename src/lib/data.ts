
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
    next: { revalidate: 10 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

function getPriceFromMetaData(metaData: { key: string; value: string }[]): number {
    const priceEntry = metaData.find(meta => meta.key === '_price' || meta.key === 'price');
    return priceEntry ? parseFloat(priceEntry.value) : 0;
}


function transformProduct(productNode: any): Product {
    const image = productNode.image?.sourceUrl || 'https://placehold.co/400x400';
    
    // Attempt to get price from metaData first, as it's more reliable with custom fields.
    // The metaData is often where WooCommerce stores the price internally (as '_price').
    const price = getPriceFromMetaData(productNode.metaData?.nodes || []);

    return {
        name: productNode.name,
        slug: productNode.slug,
        price: price,
        image: image,
        hint: productNode.name.toLowerCase(),
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
          productCategories {
            nodes {
              name
            }
          }
          metaData {
            nodes {
              key
              value
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
          productCategories {
            nodes {
              name
            }
          }
          metaData {
            nodes {
              key
              value
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
