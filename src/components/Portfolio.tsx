import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface PinnedItemEdge {
  node: Repository;
}

interface PinnedItems {
  edges: PinnedItemEdge[];
}

interface User {
  pinnedItems: PinnedItems;
}

interface GithubResponse {
  data: {
    user: User;
  };
}

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const fetchRepos = useCallback(async () => {
    const query = `
      {
        user(login: "mauriciocr22") {
            pinnedItems(first: 4) {
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    description
                    url
                  }
                }
              }
            }
          }
      }
    `;

    try {
      const accessToken = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN;
      const response = await axios.post<GithubResponse>(
        "https://api.github.com/graphql",
        {
          query,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const pinnedItems = response.data.data.user.pinnedItems.edges.map(
        (edge) => edge.node
      );
      setRepos(pinnedItems);
    } catch (err) {
      console.error("Error fetching repos:", err);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <section className="w-full flex flex-col items-center px-7">
      <h2 className="text-3xl text-slate-600 font-semibold mb-6 border-b-2 font-canada border-slate-600">
        Projects
      </h2>
      <div>
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="mb-4 w-full h-full iphone:h-24 flex space-between border border-gray-500 rounded-md"
          >
            <div className="w-9/12 p-3">
              <h3 className="font-medium text-lg font-canada mb-1">
                {repo.name}
              </h3>
              <p className="font-canada leading-tight">{repo.description}</p>
            </div>
            <div className="w-3/12">
              <a
                href={repo.url}
                className="h-full w-full text-white font-medium text-lg bg-green-600 flex items-center justify-center py-2 px-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
