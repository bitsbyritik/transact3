import { Badge } from "@workspace/ui/components/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {  Eye, TrendingUpIcon } from "lucide-react"

export const TransactionCard = () => {
    return <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
    <Card className="@container/card">
    <CardHeader className="relative">
      <CardDescription>Recent Transactions</CardDescription>
      <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
        $1,250.00
      </CardTitle>
      <div className="absolute right-4 top-4 cursor-pointer">
        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
          <Eye className="size-3" />
          View Statement
        </Badge>
      </div>
    </CardHeader>
    <CardFooter className="flex-col items-start gap-1 text-sm">
      <div className="line-clamp-1 flex gap-2 font-medium">
        Trending up this month <TrendingUpIcon className="size-4" />
      </div>
      <div className="text-muted-foreground">
        Visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
  </div>
}