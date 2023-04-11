import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { TabMenu } from "primereact/tabmenu";

const PublicNavbar = () => {
  const items = [
    { label: "Home", icon: "pi pi-fw pi-home",url:'/welcome'},
    { label: "Usuarios ", icon: "pi pi-fw pi-user",url:'/users'},
    { label: "Pblicaciones", icon: "pi pi-fw pi-comments",url:'/post' },
    { label: "Productos", icon: "pi pi-fw pi-cart-plus",url:'/product' },
  ];

  return (
    <div className="card">
      <TabMenu model={items} />
    </div>
  );
};

export default PublicNavbar;
