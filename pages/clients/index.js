import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "client1", name: "Client 1" },
    { id: "client2", name: "Client 2" },
    { id: "client3", name: "Client 3" },
  ];

  return (
    <>
      <div>
        <h1>Clients Page</h1>
      </div>
      <ul>
        {clients.map((client) => (
          // Method 1
          // <li key={client.id}>
          //   <Link href={`/clients/${client.id}`}>{client.name}</Link>
          // </li>

          // Method 2
          <li key={client.id}>
            <Link href={{
              pathname: '/clients/[id]',
              query: {id: client.id}
            }}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClientsPage;
