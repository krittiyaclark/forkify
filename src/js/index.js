import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of the app
 * - Search object
 * - Current receipe object
 * - Shopping list object
 * - Liked receipes
 */
const state = {};

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

		// 4) Search for receipes
		await state.search.getResults();

		// 5) Render result on UI
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});
