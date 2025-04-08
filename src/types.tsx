export interface RepositoriesType {
    name : string,
    primaryLanguage : string,
    visibility: string,
    description : string,
    viewCount : number,
    updatedAt : string
}

export interface UserType {
    name : string,
    bio : string,
    avatarURL : string,
    username : string,
    followers : number,
    following : number
}

export interface DataType {
    date : string,
    contributions : number
}