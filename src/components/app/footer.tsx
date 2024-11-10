import { Card, CardContent } from '../ui/card'

export function Footer() {
  return (
    <footer>
      <Card className="rounded-none border-none bg-muted-foreground/5">
        <CardContent className="flex items-center justify-center px-5 py-6">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Copyright <span className="font-bold">CutHair</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
