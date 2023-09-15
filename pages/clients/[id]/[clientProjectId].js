import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <div>
        <h1>Project page for a specific project of selected client</h1>
      </div>
    </>
  );
}

export default SelectedClientProjectPage;