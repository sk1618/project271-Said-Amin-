import React from "react";
import Card from "./components/Card";
import data from "./data";

const App = () => {
  const cards = data.map((item, index) => (
    <Card
      key={index}
      image={item.img}
      name={item.name}
      description={item.des} // or item.description if you're using that key
    />
  ));

  return (
    <>
      <h1 className="heading">Our Services</h1>
      <div className="header_underline"></div>
      <div className="wrapper">{cards}</div>
    </>
  );
};

export default App;
