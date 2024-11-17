import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  generateOAuthData,
  getLoginUrl,
  getLogoutUrl,
} from "@/wixAPI/authContext";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useToast } from "./use-toast";

export default function useAuth() {
  const pathname = usePathname();

  console.log(pathname);

  const { toast } = useToast();

  async function login() {
    try {
      const oAuthData = await generateOAuthData(wixBrowserClient, pathname);

      // set Cookie for current login
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 60 * 10 * 1000), //10min
      });

      const redirectUrl = await getLoginUrl(wixBrowserClient, oAuthData);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to log in. Please try again.",
      });
    }
  }

  async function logout() {
    try {
      const logoutUrl = await getLogoutUrl(wixBrowserClient);

      Cookies.remove(WIX_SESSION_COOKIE);

      window.location.href = logoutUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to log out. Please try again.",
      });
    }
  }

  return { login, logout };
}
