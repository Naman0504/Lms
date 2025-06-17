import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [open, setOpen] = useState(false); // dialog open state

  const { data, isLoading, refetch} = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();

  const onChangehandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  // useEffect(() => {
  //   if (open && data?.user?.name) {
  //     setName(data.user.name);
  //   }

  //   refetch()
  // }, [open, data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateUserData?.message || "Profile updated successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Error updating profile");
    }
  }, [isSuccess, isError, updateUserData, error]);

  const updateUserHandler = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    await updateUser(formData);
    refetch();
    setOpen(false);
  };

  if (isLoading) return <h1 className="text-center my-10 text-xl">Profile Loading...</h1>;

  const user = data?.user;

  const enrolledCourses = user?.enrolledCourses || [];

  return (
    <div className="my-24 max-w-4xl mx-auto px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flx-col items-center">
          <Avatar className="w-20 h-20 md:h-32 md:w-32 p-1 border-2 border-gray-100 rounded-full">
            <AvatarImage
              className="w-full h-full rounded-full object-cover hover:scale-105 hover:rotate-1 duration-700"
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="Profile"
            />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="mb-2">
            <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
              Name :
              <span className="font-normal text-gray-700 dark:text-gray-100 text-lg ml-1">
                {user.name}
              </span>
            </h1>
          </div>

          <div className="mb-2">
            <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
              Email :
              <span className="font-normal text-gray-700 dark:text-gray-100 text-lg ml-1">
                {user.email}
              </span>
            </h1>
          </div>

          <div className="mb-2">
            <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
              Role :
              <span className="font-normal text-gray-700 dark:text-gray-100 text-lg ml-1">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-2" size="sm">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangehandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="font-semibold text-xl w-fit px-5 border-b bg-gradient-to-r from-rose-100 to-teal-100 border-t border-gray-50">
          Courses you are Enrolled in
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.length === 0 ? (
            <h1 className="text-lg text-gray-500 col-span-full text-center">
              You haven't enrolled in any courses yet
            </h1>
          ) : (
            enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
