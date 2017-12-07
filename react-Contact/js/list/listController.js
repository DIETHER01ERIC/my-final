define(["app", "js/contactModel","js/list/listView"], function(app, Contact, ListView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.contact-add-link',
		event: 'click',
		handler: openAddPopup
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}
	];

	var state = {
		isFavorite: false
	};

    function init() {
		var contacts = loadContacts();
		ListView.render({
			bindings: bindings,
			model: contacts
		});
	}

	function openAddPopup() {
		app.router.load('contactEdit', { 'isFavorite': state.isFavorite });
	}

	function showAll() {
		state.isFavorite = false;
		var contacts = loadContacts();
		ListView.reRender({ model: contacts, header: "Contacts" });
	}

	function showFavorites() {
		state.isFavorite = true;
		var contacts = loadContacts({ isFavorite: true });
		ListView.reRender({ model: contacts, header: "Favorites" });
	}

	function loadContacts(filter) {
		var f7Contacts = localStorage.getItem("f7Contacts");
		var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
		if (filter) {
			contacts = _.filter(contacts, filter);
		}
		contacts.sort(contactSort);
		contacts = _.groupBy(contacts, function(contact) { return contact.firstName.charAt(0); });
		contacts = _.toArray(_.mapValues(contacts, function(value, key) { return { 'letter': key, 'list': value }; }));
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({ "firstName": "Annie", "lastName": "resuello", "phone": "+380631234561", "email": "annie@umail.com", isFavorite: true }),
			new Contact({ "firstName": "grace", "lastName": "oris", "phone": "+380631234562", "email": "grace@umail.com" }),
			new Contact({ "firstName": "christian", "lastName": "ags", "email": "christian@umail.com",  isFavorite: true }),
			new Contact({ "firstName": "Ann", "lastName": "smith", "email": "ann@umail.com"}),
			new Contact({ "firstName": "richard", "lastName": "Sison", "phone": "+380631234567", "email": "richard@umail.com" }),
			new Contact({ "firstName": "ivhann", "lastName": "alcantara", "phone": "+380631234566", "email": "ivhann@umail.com"}),
			new Contact({ "firstName": "froilan", "lastName": "Kot", "phone": "+380631234567", "email": "froilan@umail.com" }),
			new Contact({ "firstName": "Kate", "lastName": "Lang", "phone": "+380631234568", "email": "kate@umail.com" }),
			new Contact({ "firstName": "eric", "lastName": "Price", "phone": "+380631234568", "email": "eric@umail.com",  isFavorite: true }),
			new Contact({ "firstName": "Ivan", "lastName": "Ivanov", "phone": "+380631234570", "email": "ivan@umail.com" }),
			new Contact({ "firstName": "ismael", "lastName": "Lovin", "phone": "+380631234567", "email": "ismael@umail.com"}),
			new Contact({ "firstName": "Ali", "lastName": "bay", "phone": "+380631234568", "email": "ali@umail.com" }),
			new Contact({ "firstName": "agas", "lastName": "tig", "phone": "+380631234568", "email": "agas@umail.com",  isFavorite: true }),
			new Contact({ "firstName": "Daniel", "lastName": "padilla", "phone": "+380631234570", "email": "daniel@umail.com" })
		];
		localStorage.setItem("f7Contacts", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Contacts"));
	}

	function contactSort(a, b) {
		if (a.firstName > b.firstName) {
			return 1;
		}
		if (a.firstName === b.firstName && a.lastName >= b.lastName) {
			return 1;
		}
		return -1;
	}

    return {
        init: init
    };
});