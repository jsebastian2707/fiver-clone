import { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";

const ProfilePage = (): JSX.Element => {
  const user = useStore((state) => state.user);
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex flex-col space-y-1">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.avatar} alt={user?.nombre} />
            <AvatarFallback className="text-2xl">
              {user?.nombre.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-semibold">
            {user?.nombre+" "+user?.apellido}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <p className="text-sm text-muted-foreground">{user?.rol}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Edit Profile</Button>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
