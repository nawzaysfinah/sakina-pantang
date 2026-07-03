import './globals.css';

export const metadata = {
  title: 'Sakina — 44-Day Postpartum Confinement',
  description: '44-day halal postpartum confinement program bridging Malay pantang & Chinese 坐月子',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
