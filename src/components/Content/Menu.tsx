import React from "react";

function Menu() {
  return (
    <div className="lg:border-r border-borderColor lg:col-span-2 col-span-12 lg:py-8 py-4 lg:text-start text-center lg:flex lg:order-1 order-2">
      <ul className="lg:block grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:text-base text-sm">
        <li className="lg:my-3 my-1">Woman’s Fashion</li>
        <li className="lg:my-3 my-1">Men’s Fashion</li>
        <li className="lg:my-3 my-1">Electronics</li>
        <li className="lg:my-3 my-1">Home & Lifestyle</li>
        <li className="lg:my-3 my-1">Medicine</li>
        <li className="lg:my-3 my-1">Sports & Outdoor</li>
        <li className="lg:my-3 my-1">Baby’s & Toys</li>
        <li className="lg:my-3 my-1">Groceries & Pets</li>
        <li className="lg:my-3 my-1">Health & Beauty</li>
      </ul>
    </div>
  );
}

export default Menu;
