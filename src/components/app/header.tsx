import { MenuIcon, Scissors } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-1">
          <Scissors className="text-primary" />
          <strong>CutHair</strong>
        </div>

        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
