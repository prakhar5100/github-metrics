import { TriangleAlert } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const Error = () => {
  return (
    <Card className="max-w-6xl mx-auto poppins-regular">

        <CardContent>

            <div className='h-full w-full grid place-content-center'>

                <div className='flex flex-col gap-4'>

                    <div className='flex gap-3 items-center justify-center'>
                    <TriangleAlert/>
                        <h1 className='font-semibold text-red-500 text-center text-2xl'>Some error occured!</h1>
                    </div>
                <p className='text-sm text-gray-600'>Either you entered an invalid username or there was a problem in network. Please try again.</p>
                </div>
            </div>
        </CardContent>

    </Card>

  )
}

export default Error
