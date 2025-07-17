import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const [BgColor, setBgColor] = useState("bg-black-500");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header {...{ BgColor, setBgColor }} />
      <main className="p-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>

          <Outlet context={{ BgColor }} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
