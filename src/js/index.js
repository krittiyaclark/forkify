import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current receipe object
 * - Shopping list object
 * - Liked receipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
	// 1) Get query from view
	// const query = 'pizza'; //TODO
	const query = searchView.getInput(); //TODO
	console.log(query);

	if (query) {
		// 2) New search object and add to state
		state.search = new Search(query);

		// 3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4) Search for receipes
			await state.search.getResults();

			// 5) Render result on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('Something wrong with the search...');
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// Prepare UI for changes

		// Highlight selected search item

		// Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// Get recipe data and parse ingredients
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render recipe
			console.log(state.recipe);
		} catch (err) {
			alert('Error processing recipe!');
		}
	}
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((event) =>
	window.addEventListener(event, controlRecipe)
);
