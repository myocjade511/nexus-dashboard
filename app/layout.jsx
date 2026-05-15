import './globals.css'

export const metadata = {
  title: 'Nexus Dashboard',
  description: 'OpenClaw Centralized Operations Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
