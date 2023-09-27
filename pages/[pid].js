import fs from "fs/promises";
import path from "path";

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const productPaths = data.products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: productPaths,
    fallback: true,
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummyBackend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

function ProductDetails(props) {
  const { loadedProduct } = props;

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <div>{loadedProduct.description}</div>
    </div>
  );
}

export default ProductDetails;
