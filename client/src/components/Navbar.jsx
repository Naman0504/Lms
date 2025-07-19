import {
  BookText,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Menu,
  UserPen,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
  try {
    await logoutUser().unwrap(); // unwrap to handle success/failure directly
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success(data.message || "Logout Successfully");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 w-full  dark:bg-[#0A0A0A] bg-white border-b  dark:border-b-gray-700 border-b-gray-300 top-0 left-0 right-0 duration-300 z-10">
      {/* //desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between h-full gap-10">
        <div className="flex items-center gap-2">
          <BookText size={30} />
          <Link to="/">
            <h1 className="hidden md:block font-bold text-2xl">e-Learn</h1>
          </Link>
        </div>

        {/* //user Icon And DArk Mode Feature */}
        <div className="flex items-center">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      className="w-10 h-10 rounded-full"
                      src={user.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel className={"font-semibold"}>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {user.role == "student" && (
                      <DropdownMenuItem>
                        <LibraryBig size={20} />
                        <Link to="my-learning">My Learning</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem><UserPen size={20} />
                      <Link to="profile"> Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut size={20} className="text-white"/>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {/* <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem> */}
                  {user.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LayoutDashboard size={20} />
                        <Link to="/admin/dashboard"> Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex flex-col ml-2 items-center justify-center">
                <p className="text-gray-700 dark:text-gray-100 font-semibold text-sm ml-1">
                  {user?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-100  text-[10px] font-semibold ml-1">
                  ({user.role.toUpperCase()})
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Signup
              </Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          )}

          {/* <DarkMode /> */}
        </div>
      </div>

      {/* //For Mobile Nav */}

      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/">
          <h1 className="font-bold flex items-center text-2xl">
            {" "}
            <BookText size={20} /> e-Learning
          </h1>
        </Link>
        {user ? (
          <MobileNavbar logoutHandler={logoutHandler} user={user} />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/login")} >
              Signup
            </Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-100 hover:bg-gray-100 text-black"
        >
          <Menu className={"text-bold"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-fit">
        {user && (
          <>
            <div className="h-fit">
              <SheetHeader className="mt-5 flex gap-3 items-center flex-row">
                <Avatar className="w-14 h-14 rounded-full">
                  <AvatarImage
                    className="w-full h-full rounded-full"
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                    alt={user.name}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <p className="text-gray-700 dark:text-gray-100 font-semibold text-xl ml-1">
                    {user.name}
                  </p>
                  <p className="text-gray-700 dark:text-gray-100 text-[11.5px] font-semibold ml-1">
                    {user.role.toUpperCase()}
                  </p>
                </div>
              </SheetHeader>
              <Separator className="mr-2 mt-2" />
              <nav className="flex flex-col p-4 space-y-4 mt-2">
                {user.role === "student" && (
                  <Link to="/my-learning" onClick={handleClose}>
                    <span className="flex gap-2 items-center font-semibold">
                      <LibraryBig size={20} /> My Learning
                    </span>
                  </Link>
                )}
                <Link to="/profile" onClick={handleClose}>
                  <span className="flex gap-2 items-center font-semibold">
                    <UserPen size={20} /> Edit Profile
                  </span>
                </Link>
                <span
                  className="flex gap-2 items-center font-semibold cursor-pointer"
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  <LogOut size={20} /> Logout
                </span>
              </nav>

              {user.role === "instructor" && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Link to="/admin/dashboard" onClick={handleClose}>
                      <Button type="button" className="flex gap-2 w-full">
                        <LayoutDashboard size={20} /> Dashboard
                      </Button>
                    </Link>
                  </SheetClose>
                </SheetFooter>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
