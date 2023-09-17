## Section 1: Getting started

### What is Nextjs?
According to [official website](https://nextjs.org/), Nextjs is "The React Framework for the Web". Nextjs defines a clear guidance on how to write code (fetch data, route) and structure files. It also adds many different features like server-side rendering, file-based routing etc

### Key features of Nextjs:
1. Built-in serverside rendering
2. File-based routing
3. Full-stack capabiliies


## Section 2: Pages & file-based routing
File-based routing works by using the file system as a representation for routes instead of configuring a router in a single file using a library (like react-router-dom). When a file is added to the <code>pages</code> directory, it's automatically available as a route.  
If a file: <code>pages/about.js</code> is created that exports a React component, it will be accessible at <code>/about</code>
```JS
export default function About() {
  return <div>About</div>
}
```

![file-based routing](notesResources/section-2/Section2_1.png)

### Dynamic routes
A dynamic segment can be created by wrapping a folder's name in square brackets.
Example: [id].js or [slug].js
Dynamic segments can be accessed from <code>useRouter</code>

```JS
// pages/clients/[id]/index.js
import { useRouter } from "next/router";

function ClientsProjectPage() {
  const router = useRouter();
  console.log(router.query.id); // Value of 'id' will be 'client1' for route: '/clients/client1'

  return (
      <div>
        <h1>Clients Project Page</h1>
      </div>
  );
}

export default ClientsProjectPage;
```

### Catch-all segments
Dynamic segments can be extended to catch all subsequent segments by adding an ellipsis inside the brackets.  
Example: <code>pages/blog/[...slug].js</code> will catch all routes below:
- /blog/blog1
- /blog/user1/blog1
- /blog/year/month/user1 etc

```JS
// pages/blog/[...slug].js
import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query.slug); // // Value of 'slug' will be ['user1', 'post1'] for route: '/shop/user1/post1'
  return (
    <>
      <div>
        <h1>Blog posts page</h1>
      </div>
    </>
  );
}

export default BlogPostsPage;
```

### Optional catch-all segments
Catch-all segments can be made optional by including parameter in double square brackets.  
Example: <code>pages/shop/[[...slug]].js</code>  
The difference between catch-all and optional catch-all segment is that with optional, the route without a parameter (<code>/shop</code>) is also matched.

### Links
Next.js router allows client-side route transitions between pages, similar to a single-page application.  
A React component called <code>Link</code> is provided to do this client-side route transition.
```js
// pages/index.js
import Link from "next/link";

function HomePage() {
    return (
        <>
            <div>
                <h1>Home Page</h1>
            </div>
            <ul>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
                <li>
                    <Link href="/profile/setting" >Setting</Link>
                </li>
            </ul>
        </>
    );
}

export default HomePage;
```

### Link to dynamic paths

There are two ways to create dynamic paths:
- Method 1: Using interpolation
  To create a path to <code>/clients/[id].js</code>, we can write a template string to create dynamic path to different pages.

- Method 2: Using URL object
  Instead of using interpolation to create the path, we use a URL object in href where:  
  <code>pathname</code> is the name of the page in the pages directory <code>/clients/[id]</code> in this case
  <code>query</code> is an object with the dynamic segment. <code>id</code> in this case;.

```JS
// pages/clients/[id]/index.js
import Link from "next/link";

function ClientsPage() {
  let client = fetch("your-url-here");

  return (
    <>
      <div>
        <h1>Clients Page</h1>
      </div>
      <ul>
        {clients.map((client) => (

          // Method 1
          // <li key={client.id}>
          //   <Link href={`/clients/${encodeURIComponent(client.id)}`}>{client.name}</Link>
          // </li>

          // Method 2
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClientsPage;
```

## References
- https://nextjs.org/
- https://nextjs.org/docs/pages/building-your-application/routing
- https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating