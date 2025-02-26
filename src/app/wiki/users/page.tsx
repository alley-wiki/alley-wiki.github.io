import { Metadata } from "next";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { UserGrid } from "./UserGrid";

export const metadata: Metadata = {
  title: "Участники сервера | Вишневые Аллеи",
};

interface UserInfo {
  name: string;
  role?: string;
  description?: string;
  slug: string;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function parseUserFile(filePath: string): Promise<UserInfo | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Get the filename without extension as the slug
    const slug = path.basename(filePath, '.md');
    
    // Try to find role in the user template
    const roleMatch = content.match(/\|Должность=(.*?)\|/);
    const role = roleMatch ? roleMatch[1].trim() : '';
    
    // Get first paragraph as description
    let description = '';
    for (const line of lines) {
      if (line.trim() && !line.startsWith('==') && !line.startsWith('{{')) {
        description = line.trim();
        break;
      }
    }
    
    return {
      name: capitalizeFirstLetter(slug), // Capitalize the name
      role,
      description,
      slug
    };
  } catch (error) {
    console.error(`Error parsing user file ${filePath}:`, error);
    return null;
  }
}

export default async function UsersPage() {
  const usersDir = path.join(process.cwd(), 'public/wiki-content');
  const files = readdirSync(usersDir).filter(file => file.endsWith('.md'));
  
  const usersPromises = files.map(file => parseUserFile(path.join(usersDir, file)));
  const usersArray = await Promise.all(usersPromises);
  const users = usersArray.filter((user): user is UserInfo => user !== null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        👥 Участники сервера
      </h1>
      <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 sm:mb-12">
        Все участники сервера Вишневые Аллеи
      </p>
      
      <UserGrid users={users} />
    </div>
  );
}
