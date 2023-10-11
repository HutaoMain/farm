import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <section className="header-left">
          <h1 className="header-title">
            Get the Best Fresh <span style={{ color: "#08C25E" }}>Grocery</span>
          </h1>
          <p className="header-slogan">
            we care for your health, buy groceries which are well processed and
            farm-fresh
          </p>
        </section>
        <section className="header-right"></section>
      </div>
    </div>
  );
};

export default Header;
