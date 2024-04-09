import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {compileMDX} from 'next-mdx-remote/rsc';

const recipesPath = join(process.cwd(), 'src', 'recipes');

export type RecipeMetadata = {
    slug: string;
    title: string;
};

/**
 * @param {string} filename The filename of the recipe is also the slug.
 */
export async function getRecipeBySlug(filename: string) {
    try {
        const contents = await readFile(join(recipesPath, filename), {
            encoding: 'utf-8',
        });

        const {content, frontmatter} = await compileMDX<RecipeMetadata>({
            source: contents,
            options: {
                parseFrontmatter: true,
            }
        });

        return {
            meta: {
                ...frontmatter,
                // Trims off the `.mdx` extension
                slug: filename.substring(0, filename.length - 4),
            },
            content,
        };
    } catch (error) {
        console.error('Error reading recipe metadata');
        console.error(error);
        throw error;
    }
}

export async function getAllRecipesMetadata() {
    try {
        const files = await readdir(recipesPath);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));

        return await Promise.all(mdxFiles.map(getRecipeBySlug));
    } catch (error) {
        console.error('Error reading recipe metadata');
        console.error(error);
        throw error;
    }
}
