import { createContext, ReactNode, useContext, useState } from "react";
import { fetchGitHubProfile } from "../utils/index";
import { DataType, RepositoriesType, UserType } from "@/types";
import { fetchRepositories } from "../utils/index";
import { fetchData } from "../utils/index";

type UserContextType  = {
    user : UserType | null,
    setUserData : (username : string) => void,
    repositories : RepositoriesType[] | null,
    data : DataType[] | null,
    loading : boolean,
    error : boolean
}

const defaultValue : UserContextType = {
    user : null,
    setUserData : () => {},
    repositories : null,
    data : null,
    loading : true,
    error : false

}

const UserContext = createContext<UserContextType>(defaultValue)


export function UserProvider({children} : {children : ReactNode}) {

    const [user, setUser] = useState<UserType | null>(null)
    const [repositories, setRepo] = useState<RepositoriesType[] | null>(null)
    const [data, setData] = useState<DataType[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const setUserData = async (username : string) => {
        setRepo(null)
        setUser(null)
        setData(null)
        setError(false)
        setLoading(true) 

        try {
            const userResponse = await fetchGitHubProfile(username)
            setUser({
                name : userResponse.name,
                username : username,
                bio : userResponse.bio,
                avatarURL : userResponse.avatarUrl,
                followers : userResponse.followers.totalCount,
                following : userResponse.following.totalCount
                
            })

            const userRepositories = await fetchRepositories(username)

            const repos = userRepositories.map((repo) => ({
                name: repo.name,
                primaryLanguage: repo.primaryLanguage?.name || "Unknown",
                visibility: "public",
                description: repo.description,
                viewCount: repo.stargazerCount,
                updatedAt: repo.updatedAt
            }))

            setRepo(repos)

            const userData = await fetchData(username)

            setData(userData)


        } catch {
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <UserContext.Provider value={{setUserData, user, repositories, data, loading, error}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
