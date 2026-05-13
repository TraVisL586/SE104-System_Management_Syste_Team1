import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <TopNav onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;