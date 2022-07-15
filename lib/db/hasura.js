export async function queryHasuraGQl(operationsDoc, operationName, variables) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: "POST",
		headers: {
			"x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}

const operationsDoc = `
    query MyQuery {
     users {
        email
        id
        issuer
        publicAddress
     }
    }
  `;

function fetchMyQuery() {
	return queryHasuraGQl(operationsDoc, "MyQuery", {});
}
