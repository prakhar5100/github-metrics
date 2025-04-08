import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'


const Loader = () => {
  const repositories = [1, 2, 3, 4]
  return (
    <Card className="max-w-6xl mx-auto poppins-regular">

        
        <CardContent>

            <div className='flex flex-col md:flex-row gap-6 justify-between'>
              <Skeleton className='h-36 w-36 rounded-full bg-gray-200'/>
              <Card className='md:w-2/3 h-96 p-4 overflow-scroll'>

              <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-5 mx-auto my-auto'>
                {
                  repositories.map((repo) => <Skeleton className='w-80 h-32'/>)
                }
              </div>
              </Card>

              </div>


        </CardContent>
      
    </Card>
  )
}

export default Loader
