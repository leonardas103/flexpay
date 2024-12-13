import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log({credentials})
        if (!credentials) {
          return null; // Fail if no credentials are provided
        }
        
        const { username, password } = credentials;

        // Replace this logic with your actual authentication mechanism
        if (username === "mifos" && password === "password") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
          };
        }

        return null; // Return null if authentication fails
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
});

export { handler as GET, handler as POST };
