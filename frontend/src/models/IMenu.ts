// API SOURCE: https://github.com/kubowania/burger-api

export interface IMenu {
  burgers: IBurgers[];
}
export interface IBurgers {
  name: string;
  description: string;
  ingredients: [string];
}
