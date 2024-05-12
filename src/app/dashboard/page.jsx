import Dashboard from "@/components/dashboard";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const page = () => {
  const getUser = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const user = jwtDecode(token.value);
    // console.log(user)
    return user;
  };

  return <Dashboard user={getUser()} />;
};
export default page;
