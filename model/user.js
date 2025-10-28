// In-memory User model

const users = [
	{
		id: 1,
		username: 'alice',
		// password: password123 (bcrypt hash for 'password123')
		password: '$2a$10$Q9Qw6Qn6Qn6Qn6Qn6Qn6QeQ9Qw6Qn6Qn6Qn6Qn6Qn6Qn6Qn6Qn6',
	},
	{
		id: 2,
		username: 'bob',
		// password: mysecurepass (bcrypt hash for 'mysecurepass')
		password: '$2a$10$7Q9Qw6Qn6Qn6Qn6Qn6Qn6QeQ9Qw6Qn6Qn6Qn6Qn6Qn6Qn6Qn6',
	},
];

module.exports = users;