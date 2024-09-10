import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    <section
      id="portfolio"
      className="w-full flex flex-col items-center px-7 dark:bg-[#222222] -mb-[1px]"
    >
      <h2 className="text-3xl text-slate-600 font-semibold mb-6 border-b-2 font-canada border-slate-600 dark:text-slate-200 dark:border-slate-200">
        {t("navProjects")}
      </h2>
      <div>
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="mb-4 w-full h-full iphone:h-24 flex space-between border border-gray-500 rounded-md dark:text-slate-200"
          >
            <div className="w-9/12 p-3">
              <h3 className="font-medium text-lg font-canada mb-1 duration-[0s]">
                {repo.name}
              </h3>
              <p className="font-canada leading-tight duration-[0s]">
                {repo.description}
              </p>
            </div>
            <div className="w-3/12">
              <a
                href={repo.url}
                className="h-full w-full projectsButton text-white font-medium text-lg bg-[#169444] flex items-center justify-center md:hover:bg-green-700 transition-colors duration-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("projectsCta")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
