## Section 1: Getting started

### What is Nextjs?
According to [official website](https://nextjs.org/), Nextjs is "The React Framework for the Web". Nextjs defines a clear guidance on how to write code (fetch data, route) and structure files. It also adds many different features like server-side rendering, file-based routing etc

### Key features of Nextjs:
1. Built-in serverside rendering
2. File-based routing
3. Full-stack capabiliies


## Section 3: Pages & file-based routing
File-based routing works by using the file system as a representation for routes instead of configuring a router in a single file using a library (like react-router-dom). When a file is added to the <code>pages</code> directory, it's automatically available as a route.  
If a file: <code>pages/about.js</code> is created that exports a React component, it will be accessible at <code>/about</code>
```JS
export default function About() {
  return <div>About</div>
}
```

![file-based routing](notesResources/section-3/Section3_1.png)

File-based vs code-based routing
![file-based vs code-based routing](notesResources/section-3/Section3_2.png)

### Dynamic routes
A dynamic segment can be created by wrapping a folder's name in square brackets.
Example: [id].js or [slug].js
Dynamic segments can be accessed from <code>useRouter</code> hook.

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

### Shallow routing
Shallow routing is a technique to update the URL of a page without reloading the page itself or fetching new data from the server.  

```JS
import { useEffect } from 'react'
import { useRouter } from 'next/router'
 
// Current URL is '/'
function Page() {
  const router = useRouter()
 
  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])
 
  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}
 
export default Page
```
**Note**: Shallow routing only works for URL changes in the current page.  
For example, let's assume we have another page called <code>pages/about.js</code>, and we run the below code:
```JS
router.push('/?counter=10', '/about?counter=10', { shallow: true });
```
Since that's a new page, it'll unload the current page, load the new one and wait for data fetching even though we asked to do shallow routing.

### Custom 404 page
To add a custom 404 page, create a <code>404.js</code> file inside <code>pages</code> directory.

## Section 4: Project time: Working with file-based routing
This section is a small project built to practice File-based routing.

Project routes:
![project routes](notesResources/section-4/Section4_1.png)

### Add layout to all pages:
To create a layout for all pages, we wrap the component in <code>_app.js</code> with our custom layout. In the example below, we add <code>MainHeader</code>, a component to display navbar in all pages
```JS
// components/layout/layout.js
import MainHeader from "./mainHeader";
import { Fragment } from "react";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
```  

```JS
// pages/_app.js
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### Styling components in Next.js:
Next.js has built-in support for css modules. All css module files should end with <code>.module.css</code>

## Section 5: Page Pre-rendering & Data Fetching
Next.js pre-renders every page by default, i.e, it generates HTML for each page in advance, instead of loading it on client side by JavaScript. Pre-rendering helps in better performance and SEO.

Next.js supports two types of pre-rendering:
1. Static generation:  
   Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
2. Server-side rendering:  
   Server-side Rendering is the pre-rendering method that generates HTML on each request.

Next.js allows to select type of pre-rendering for each page as required.

![page pre-rendering](notesResources/section-5/Section5_1.png)


## References
- https://nextjs.org/
- https://nextjs.org/docs/pages/building-your-application/routing
- https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
- https://www.netlify.com/blog/2021/06/02/shallow-routing-in-next.js/
- https://nextjs.org/learn/basics/data-fetching/pre-rendering
- https://nextjs.org/learn/basics/data-fetching/two-forms