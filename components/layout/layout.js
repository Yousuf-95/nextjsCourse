import MainNavigation from "./mainNavigation";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
