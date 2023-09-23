import MainHeader from "./mainHeader";

const { Fragment } = require("react");

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
