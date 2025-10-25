import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

const title = "Shubham Singh | Platform Engineer & AI Innovator";
const description = "The portfolio of Shubham Singh, a visionary engineer architecting scalable systems, driving AI innovation, and leading platform engineering across corporate and startup ecosystems.";
const url = "https://shubhamsinngh.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Shubham Singh`,
  },
  description,
  keywords: [
    "Shubham Singh",
    "Platform Engineer",
    "DevOps",
    "SRE",
    "AI Innovator",
    "Software Engineer",
    "System Architect",
    "Full Stack Developer",
    "Portfolio",
    "Salesforce",
    "Airtel",
    "Legitmark",
    "Amway",
    "Octonius"
  ],
  authors: [{ name: "Shubham Singh", url }],
  creator: "Shubham Singh",
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: title,
    images: [{
      url: "/og-image.png", // TODO: Create this image
      width: 1200,
      height: 630,
      alt: description,
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@your_twitter_handle", // TODO: Replace with actual twitter handle
    title,
    description,
    images: [{
      url: "/og-image.png",
      alt: description,
    }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shubham Singh",
  "url": url,
  "sameAs": [
    "https://github.com/shubhamcommits", // TODO: Verify username
    "https://linkedin.com/in/yourusername" // TODO: Verify username
  ],
  "jobTitle": "Platform Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Salesforce"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
