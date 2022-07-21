export async function isNewUser(token, issuer) {
	const operationsDoc = `
query isNewUser ($issuer: Sring!){
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
  `;
	const response = await queryHasuraGQl(
		operationsDoc,
		"isNewUser",
		{ issuer },
		token
	);
	console.log({ response });
	return response?.users?.length === 0 ? true : false;
}

export async function queryHasuraGQl(
	operationsDoc,
	operationName,
	variables,
	token
) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRyaWFuYSIsImlhdCI6MTY1ODM5NzE2NywiZXhwIjoxNjU5MDAyMDEwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90YWRyaSJ9fQ.CWIRr8an7fIIYVf4rW5GxWbsDjTXZmLvoLpsn_01MY0",
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRyaWFuYSIsImlhdCI6MTY1ODM5NzE2NywiZXhwIjoxNjU5MDAyMDEwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90YWRyaSJ9fQ.CWIRr8an7fIIYVf4rW5GxWbsDjTXZmLvoLpsn_01MY0
