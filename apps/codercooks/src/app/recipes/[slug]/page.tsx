import {
    getRecipeBySlug,
    getAllRecipesMetadata,
    type RecipeMetadata,
} from '@/lib/recipes';
import type {
    GeneratedPageComponentProps,
    GenerateMetadataFunction,
    GenerateStaticParamsFunction,
    PageServerComponent,
} from '@/lib/types';

type RecipePathParams = Pick<RecipeMetadata, 'slug'>;

export const generateStaticParams: GenerateStaticParamsFunction<RecipePathParams> = async () => {
    const recipeMetadata = await getAllRecipesMetadata();

    return recipeMetadata.map(datum => ({
        slug: datum.meta.slug,
    }));
};

type RecipePageProps = GeneratedPageComponentProps<typeof generateStaticParams>;

export const generateMetadata: GenerateMetadataFunction<RecipePageProps> = async (
    props,
) => {
    const recipe = await getRecipeBySlug(`${props.params.slug}.mdx`);

    return {
        title: recipe.meta.title,
    };
};

const RecipePage: PageServerComponent<RecipePageProps> = async (props) => {
    const slug = props.params.slug;
    const recipe = await getRecipeBySlug(`${slug}.mdx`);

    return (
        <main>
            <div>
                {recipe.content}
            </div>
        </main>
    );
};

export default RecipePage;
