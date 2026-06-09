import Sidebar from "../components/Sidebar";

function DashboardLayout({
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
  style={{
    flex: 1,
    padding: "20px",
    marginLeft: "250px",
  }}
>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;