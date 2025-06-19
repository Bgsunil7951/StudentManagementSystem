import { BookOpenText, House, Info,User  } from "lucide-react";


export const menuData = [
    {
      key: "home",
      label: "Home",
      path : "/",
      icon : House,
      secure:false
    },
    {
      key: "Students",
      label: "Students",
      path : "/students",
      icon : BookOpenText,
      secure:true
    }
  ];
