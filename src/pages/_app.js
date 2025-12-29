import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Outfit, Inter, JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import { AuthProvider } from "@/contexts/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientOnly from "@/components/ClientOnly";
import { ProfileProvider } from "@/contexts/profileContext";

export default function App({ Component, pageProps }) {
  const isPublic = Component.auth === false;

  return (
    <AuthProvider>
    <Nav   log={!isPublic}/>

      <main style={{ padding: "20px" }}>
        {isPublic ? (
          <Component {...pageProps} />
        ) : (
          <ClientOnly>
            <ProtectedRoute>
              <ProfileProvider>
                <Component {...pageProps} />
              </ProfileProvider>
            </ProtectedRoute>
          </ClientOnly>
        )}
      </main>
    </AuthProvider>
  );
}
