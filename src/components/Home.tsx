import {Search } from "lucide-react"
import { Input } from "./ui/input"
import UserDetails from "./UserDetails"
import { Button } from "./ui/button"
import { useState } from "react"
import { useUser } from "@/context/UserContext"
import Loader from "./Loader"
import Error from "./Error"

const Home = () => {

  const [username, setUsername] = useState("")

  const {user, repositories, data, setUserData, loading, error} = useUser()

  const handleSubmit =  (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setUserData(username) 
  }
  
  return (
    <div className="w-screen min-h-screen p-4 bg-zinc-50 poppins-regular"> 

      <div className="py-16  my-4">

          <form className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4 flex flex-col gap-4">
            <div className="relative bg-white"> 
            <Search className="text-slate-700 absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer " size={18}/>      
              <Input type="text" placeholder="Enter the username" onChange={(e) => setUsername(e.target.value)}/>

            </div>
              <Button className="cursor-pointer" onClick={(e) => handleSubmit(e)}>Submit</Button>

          </form>

      </div>

      {
        error && <Error />
      }

      {
        user && repositories && data && <UserDetails/>
      }

      {
        loading && <Loader />
      }


        
    </div>
  )
}

export default Home
