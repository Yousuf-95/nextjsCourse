import { useRouter } from "next/router";

function ClientsProjectPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    // load data here...

    // Method 1
    router.push('/clients/client1/project1');

    // Method 2
    router.push({
      pathname: 'clients/[id]/[clientProjectId]',
      query: { id: 'client1', clientProjectId: 'project1'}
    });

    // Replace current page (cannot go back in browser)
    router.replace('/clients/client1/project1') // can use any of the two ways mentioned above to navigate 
  }

  return (
    <>
      <div>
        <h1>Clients Project Page</h1>
        <button onClick={loadProjectHandler} >Load project 1</button>
      </div>
    </>
  );
}

export default ClientsProjectPage;
