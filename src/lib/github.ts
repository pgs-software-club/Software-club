export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  contributors_url: string;
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  name?: string;
  bio?: string;
}

const ORG_NAME = 'pgs-software-club';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const REVALIDATE_TIME = 0; // Disable cache temporarily to debug

// High-quality mock data for fallback
const MOCK_REPOS: Repository[] = [
  {
    id: 1,
    name: "club-website",
    description: "The official website for PGS Software Club, built with Next.js and Tailwind CSS.",
    html_url: `https://github.com/${ORG_NAME}/club-website`,
    language: "TypeScript",
    stargazers_count: 12,
    contributors_url: ""
  },
  {
    id: 2,
    name: "learning-resources",
    description: "A curated list of software engineering resources and roadmap for club members.",
    html_url: `https://github.com/${ORG_NAME}/learning-resources`,
    language: "Markdown",
    stargazers_count: 8,
    contributors_url: ""
  },
  {
    id: 3,
    name: "project-alpha",
    description: "An internal project focused on building modular components for campus management.",
    html_url: `https://github.com/${ORG_NAME}/project-alpha`,
    language: "React",
    stargazers_count: 5,
    contributors_url: ""
  }
];

const MOCK_MEMBERS: Contributor[] = [
  {
    id: 1,
    login: "sairashgautam",
    name: "Sairash Gautam",
    avatar_url: "https://github.com/sairash",
    html_url: "https://github.com/sairash",
    contributions: 45,
    bio: "President @ PGS Software Club | Full Stack Developer"
  },
  {
    id: 2,
    login: "lagzen",
    name: "lagzen Thakuri",
    avatar_url: "https://github.com/lagzenthakuri",
    html_url: "https://github.com/lagzenthakuri",
    contributions: 100,
    bio: "Empowering next-gen software innovators."
  }
];

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'PGS-Software-Club-Website',
  };
  
  if (GITHUB_TOKEN) {
    console.log('GitHub Token found, using it for requests');
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  } else {
    console.warn('No GITHUB_TOKEN found in environment variables');
  }
  return headers;
};

export async function getUserDetails(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: getHeaders(),
      next: { revalidate: REVALIDATE_TIME },
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getOrgRepos(): Promise<Repository[]> {
  try {
    console.log(`Fetching repos for org: ${ORG_NAME}`);
    const response = await fetch(`https://api.github.com/orgs/${ORG_NAME}/repos?sort=updated&per_page=100&type=all`, {
      headers: getHeaders(),
      next: { revalidate: REVALIDATE_TIME },
    });
    
    if (!response.ok) {
      console.error(`GitHub API error (Repos): ${response.status} ${response.statusText}`);
      if (response.status === 403 || response.status === 401) {
        console.warn(`GitHub API Rate limited or Unauthorized. Using mock repos.`);
        return MOCK_REPOS;
      }
      return MOCK_REPOS;
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} repos`);
    return data.length > 0 ? data : MOCK_REPOS;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return MOCK_REPOS;
  }
}

export async function getRepoContributors(repoName: string): Promise<Contributor[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${ORG_NAME}/${repoName}/contributors`, {
      headers: getHeaders(),
      next: { revalidate: REVALIDATE_TIME },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export async function getOrgMembers(): Promise<Contributor[]> {
  try {
    console.log(`Fetching members for org: ${ORG_NAME}`);
    const response = await fetch(`https://api.github.com/orgs/${ORG_NAME}/members?per_page=100`, {
      headers: getHeaders(),
      next: { revalidate: REVALIDATE_TIME },
    });
    
    if (!response.ok) {
      console.error(`GitHub API error (Members): ${response.status} ${response.statusText}`);
      if (response.status === 403 || response.status === 401) {
        return MOCK_MEMBERS;
      }
      return [];
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} members`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching org members:', error);
    return [];
  }
}

export async function getAllMembers(): Promise<Contributor[]> {
  try {
    console.log('Fetching all members (combined logic)');
    const [repos, orgMembers] = await Promise.all([
      getOrgRepos(),
      getOrgMembers(),
    ]);

    const contributorsMap = new Map<string, Contributor>();

    // Add explicit org members first
    if (Array.isArray(orgMembers)) {
      orgMembers.forEach(member => {
        contributorsMap.set(member.login, { ...member, contributions: 0 });
      });
    }

    // Then add contributors from top repos
    if (Array.isArray(repos)) {
      const contributorsResults = await Promise.all(
        repos.slice(0, 5).map(repo => getRepoContributors(repo.name))
      );

      contributorsResults.flat().forEach(contributor => {
        if (contributor && contributor.login) {
          if (!contributorsMap.has(contributor.login)) {
            contributorsMap.set(contributor.login, { ...contributor });
          } else {
            const existing = contributorsMap.get(contributor.login)!;
            existing.contributions = (existing.contributions || 0) + (contributor.contributions || 0);
          }
        }
      });
    }

    const members = Array.from(contributorsMap.values()).sort((a, b) => (b.contributions || 0) - (a.contributions || 0));

    if (members.length === 0) {
      console.log('No members found from API, using mock data');
      return MOCK_MEMBERS;
    }

    console.log(`Found ${members.length} members in total`);

    // Only fetch details for top 10 members to avoid rate limits
    const detailedMembers = await Promise.all(
      members.slice(0, 10).map(async (member) => {
        const details = await getUserDetails(member.login);
        return {
          ...member,
          name: details?.name || member.name || member.login,
          bio: details?.bio || member.bio || '',
          avatar_url: details?.avatar_url || member.avatar_url,
          html_url: details?.html_url || member.html_url || `https://github.com/${member.login}`,
        };
      })
    );

    const remainingMembers = members.slice(10).map(m => ({
        ...m,
        name: m.name || m.login,
        bio: m.bio || '',
        html_url: m.html_url || `https://github.com/${m.login}`
    }));

    return [...detailedMembers, ...remainingMembers];
  } catch (error) {
    console.error('Error in getAllMembers:', error);
    return MOCK_MEMBERS;
  }
}
