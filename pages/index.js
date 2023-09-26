import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// The code in this function won't be visible in the frontend.
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummyBackend.json");
  console.log(filePath);
  const result = await fs.readFile(filePath);
  const data = JSON.parse(result);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
