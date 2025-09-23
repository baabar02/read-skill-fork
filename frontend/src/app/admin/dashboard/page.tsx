import { Card } from '@/components/ui/card'
import { UsersInfo } from './_components/users'

const Dashboard = () => {
  return (
    <div className="">
      <Card className="p-2 md:p-10 h-screen">
        <UsersInfo />
      </Card>
    </div>
  )
}

export default Dashboard
