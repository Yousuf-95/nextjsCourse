import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();
  console.log("router.query: ", router.query);
  console.log("router.asPath", router.asPath);

  return (
    <>
      <div>
        <h1>Project page for a specific project of selected client</h1>
      </div>
    </>
  );
}

export default SelectedClientProjectPage;