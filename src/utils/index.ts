import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN


export async function fetchGitHubProfile(username:string) {
    const query = `
    query($login: String!) {
      user(login: $login) {
        name
        bio
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  `

  const variables = {login : username}

  try {
    const response = await axios.post(
        GITHUB_API_URL, {
            query, variables
        }, {
            headers : {
                          "Content-Type": "application/json",
                            Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }
    )

    const user = response.data.data.user;


    return user;
  } catch (error : any) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw error;    
  }
};


export async function fetchRepositories(username:string) {
    const query = `
    query($login: String!) {
      user(login: $login) {
            repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
                name
                description
                url
                stargazerCount
                primaryLanguage {
                name
                }
                updatedAt
            }
            }
        }
        }
  `

  const variables = {login : username}

  try {
    const response = await axios.post(
        GITHUB_API_URL, {
            query, variables
        }, {
            headers : {
                          "Content-Type": "application/json",
                            Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }
    )

    const repositories = response.data.data.user.repositories.nodes;
    console.log(response.data.data.user.repositories.nodes)

    return repositories;
  } catch (error : any) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw error;    
  }
};


export async function fetchData(username:string) {
    const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
          totalContributions
        }
      }
    }
  }
`;
const toDate = new Date(); 
const fromDate = new Date();
fromDate.setMonth(fromDate.getMonth() - 6); 
const from = fromDate.toISOString(); 
const to = toDate.toISOString();

const variables = {
  username,
  from,
  to
};

  try {
    const response = await axios.post(
        GITHUB_API_URL, {
            query, variables
        }, {
            headers : {
                          "Content-Type": "application/json",
                            Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        }
    )

    const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks 

    const chartData = weeks.flatMap(week =>
        week.contributionDays.map(day => ({
          date: day.date, 
          contributions: day.contributionCount,
        }))
      );
    
      return chartData;

  } catch (error : any) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw error;    
  }
};