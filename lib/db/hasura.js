export async function queryHasuraGQl(operationsDoc, operationName, variables) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: "POST",
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRyaSIsImlhdCI6MTY1ODE1ODI5NSwiZXhwIjoxNjU4NzYzMTYwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90YWRyaSJ9fQ.Ae1gajsxox17hkESalhHsYtHrn1gtAuhjPvWS_PzhoE",
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
