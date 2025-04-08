import { Calendar1, Code, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { formatDate } from "@/utils";
import { useUser } from "@/context/UserContext";

const UserDetails = () => {

  const {user, repositories, data} = useUser()

      
  return (
    <Card className="max-w-6xl mx-auto poppins-regular">

        
        <CardContent>

            <div className="flex flex-col md:flex-row gap-6">

                {
                    user && 
                    <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                        <Avatar className="h-36 w-36">
                            <AvatarImage src={user.avatarURL} alt="user" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>


                        <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-muted-foreground">{user.username}</p>
                        </div>

                        <div className="flex gap-2">
                            <h1>{user.followers} followers</h1>
                            <h1>{user.following} following </h1>
                        </div>

                </div>
                }
                
                
                {
                    repositories &&   <Card className="md:w-2/3 max-h-96 p-4 overflow-scroll">

                    <h3 className="text-lg font-semibold mb-4">Repositories</h3>
    
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5"> 
                        {
                            repositories.map((repo, index) => 
                            <Card key={index} className="cursor-pointer">
                                <CardHeader>
                                    <CardTitle>{repo.name}</CardTitle>
                                    <CardDescription>{repo.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
    
                                    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 text-xs">
    
                                        <div className="flex gap-1 items-center">
                                            <Code size={20}/>
                                            <h1>{repo.primaryLanguage}</h1>
                                        </div>
    
                                        <div className="flex gap-1 items-center sm:justify-center">
                                            <Eye size={20}/>
                                            <h1> {repo.viewCount}
                                            </h1>
                                        </div>
    
                                        <div className="flex gap-1 items-center">
                                            <Calendar1 size={20}/>
                                            <h1 className="w-full"> {formatDate(repo.updatedAt)}
                                            </h1>
                                        </div>
    
                                    </div>
    
                                </CardContent>
                            </Card>
                            )
                        }
    
                    </div>
    
                    </Card>
    
                }
              
            </div>

            <Card className="p-4 shadow-md rounded-2xl my-3">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Contributions (Last 6 Months)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="date" tickFormatter={d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="contributions" stroke="#4f46e5" strokeWidth={2} dot={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>


        </CardContent>
      
    </Card>
  )
}

export default UserDetails
