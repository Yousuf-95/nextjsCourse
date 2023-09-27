import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// The code in this function won't be visible in the frontend.
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummyBackend.json");
  const result = await fs.readFile(filePath);
  const data = JSON.parse(result);

  if (!data) {
    return {
      redirect: {
        destination: "/error",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // Update the page after every 60 seconds
    revalidate: 60,
  };
}

export default HomePage;
