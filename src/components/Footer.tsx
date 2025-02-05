import React from "react";
import "./Footer.css";

// Define the interface for each footer item
interface Item {
  title: string;
  link: string;
}

// Define the interface for FooterColumn component props
interface FooterColumnProps {
  title: string;
  items: Item[];
}

// Reusable Footer Column Component
const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.link} aria-label={item.title}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer: React.FC = () => {
  const myAccountItems: Item[] = [
    { title: "Orders & Returns", link: "#" },
    { title: "Email Preferences", link: "#" },
    { title: "Beyond+™", link: "#" },
    { title: "Welcome Rewards™", link: "#" },
    { title: "Account Settings", link: "#" },
  ];

  const helpItems: Item[] = [
    { title: "Help Center", link: "#" },
    { title: "Contact Customer Care", link: "#" },
    { title: "Shipping Information", link: "#" },
    { title: "Return Policy", link: "#" },
    { title: "International Help", link: "#" },
    { title: "Accessibility", link: "#" },
    { title: "FAQ", link: "#" },
    { title: "Beyond Protection Powered by Extend", link: "#" },
  ];

  const companyItems: Item[] = [
    { title: "About Us", link: "#" },
    { title: "Contact Us", link: "#" },
    { title: "Careers", link: "#" },
    { title: "Investor Relations", link: "#" },
    { title: "Sell Your Products", link: "#" },
    { title: "Supply Chain Transparency", link: "#" },
  ];

  const shopItems: Item[] = [
    { title: "Deals", link: "#" },
    { title: "New Arrivals", link: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <FooterColumn title="MY ACCOUNT" items={myAccountItems} />
        <FooterColumn title="LET US HELP" items={helpItems} />
        <FooterColumn title="COMPANY INFORMATION" items={companyItems} />
        <FooterColumn title="MORE WAYS TO SHOP" items={shopItems} />
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} News Aggregator. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
