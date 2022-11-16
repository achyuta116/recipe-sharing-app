import { createContext, useState } from "react";

type RecipesContextType = {
    recipes: Recipe[],
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

type Recipe = {
    rname: string,
    cuisine: string,
    course: string,
    cook_time: number,
    prep_time: number,
    instructions: string,
    image_url: string,
    date: string,
    uname: string
}

export const RecipesContext = createContext<RecipesContextType>(
    {
        recipes: [],
        setRecipes: () => {}
    }
)


interface Props {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

export const RecipesContextProvider = ({ children }: Props) => {

    const [recipes, setRecipes] = useState<Recipe[]>([])

    console.log('RecipeContext recipes:', recipes)
    return (
        <RecipesContext.Provider value={{ recipes, setRecipes }}>
            { children }
        </RecipesContext.Provider>
    )

}
