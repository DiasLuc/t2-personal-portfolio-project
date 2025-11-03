// In-memory User model

const users = [
	{
		id: 1,
		username: 'alice',
		// password: password123 (bcrypt hash for 'password123')
		password: '$2a$10$K61ulLQcumrOm/YEf/MGhuoVIRhjRh2P1sFtuaRrMD9l09gvgBAeW', // <-- replace with real hash
	},
	{
		id: 2,
		username: 'bob',
		// password: mysecurepass (bcrypt hash for 'mysecurepass')
		password: '$2a$10$VnfoAs3NSdg9/AX5eZAk7ukXdDwz/e2x8zlacEZciR3jnyl0LAfWq', // <-- replace with real hash
	},
];

module.exports = users;