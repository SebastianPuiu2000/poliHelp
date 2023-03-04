import './globals.css';
import { UserProvider } from './UserContext';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar/>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
