const PRICE = 9.99;
const DEFAULTSEARCH = '90s';
const LOAD_NUM = 10;

let app = new Vue ({
	
	el: '#app',

	data: {
		newSearch: DEFAULTSEARCH,
		lastSearch: DEFAULTSEARCH,
		price: PRICE,
		total: 0,
		results: [],
		items: [],
		cart: [],
		loading: false
	},

	//these props are computed EVERY TIME the props the computed prop relies upon are changed;
	//call without parentheses, like so: v-if="computedProperty"
	computed: {

		noMoreItems () {

			return (this.items.length && this.items.length === this.results.length);
		}
	},

	methods: {

		appendItems () {

			if (this.items.length < this.results.length) {

				let nextChunk = this.results.slice(this.items.length, this.items.length + LOAD_NUM);

				this.items = this.items.concat(nextChunk);
			}
		},

		onSubmit () {

			if (this.newSearch) {

				this.items = [];
				this.results = [];
				this.loading = true;

				this.$http
				.get('/search/'.concat(this.newSearch))
				.then(
					(res) => {
						
						this.results = res.data;

						this.appendItems();

						this.lastSearch = this.newSearch;

						this.loading = false;
					},
					(res) => {

					}
				);
			}
		},

		addItem (index) {

			const item = this.items[index];
			
			this.total += PRICE;

			let found = false;
			for (let i = this.cart.length - 1; i >= 0; i--) {
				if (this.cart[i].id === item.id) {
					this.cart[i].qty++;
					found = true;
					break;
				}
			}

			if (!found) {
				item.qty = 1;
				this.cart.push(item);
			}
		},

		inc (item) {

			item.qty++;
			this.total += PRICE;
		},

		dec (item) {

			item.qty--;
			if (item.qty <= 0) {
				for (let i = this.cart.length - 1; i >= 0; i--) {
					if (this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}

			this.total -= PRICE;
			if (this.total < 0) {
				this.total = 0;
			}
		}
	},

	filters: {
		currency (price) {
			return '$'.concat(price.toFixed(2));
		}
	},

	mounted () {
		
		this.onSubmit();

		const watcher = scrollMonitor.create(document.getElementById('product-list-bottom'));

		watcher.enterViewport(() => {
			this.appendItems();
		});
	}
});

