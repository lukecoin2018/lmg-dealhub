// Page-content wrapper for the app routes. The chrome (brand header, sidebar,
// scrolling <main>) is rendered once by app/(app)/layout.tsx, so it persists
// across navigations; this only frames the page's own content.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="app-shell__page">{children}</div>
}
