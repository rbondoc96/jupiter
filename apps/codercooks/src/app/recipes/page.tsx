import Link from 'next/link';

import {getAllRecipesMetadata} from '@/lib/recipes';
import type {PageServerComponent} from '@/lib/types';

const RecipesPage: PageServerComponent = async () => {
    const recipes = await getAllRecipesMetadata();

    return (
        <div>
            <h1>Recipes</h1>

            <div>
                {recipes.map(recipe => (
                    <Link
                        key={recipe.meta.slug}
                        href={`recipes/${recipe.meta.slug}`}
                    >
                        {recipe.meta.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
