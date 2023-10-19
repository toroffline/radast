import Header from "../components/header/Header";

function Layout(props) {
  return (
    <div className="main">
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
