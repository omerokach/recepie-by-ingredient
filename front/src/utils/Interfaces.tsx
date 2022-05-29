export interface RecepieInterface{
    title: string,
    image: string,
    imageType: string,
    usedIngredientCount: Number,
    missedIngredientCount: Number,
    missedIngredients: []

}

export interface Ingredient{
    id: Number,
    amount: Number,
    unit: string,
    unitLong: string,
    unitShort: string,
    aisle: string,
    name: string,
    original: string,
    originalName: string,
    meta: [string],
    extendedName: string,
    image: string
}