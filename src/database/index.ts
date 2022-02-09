import { createConnection, getConnectionOptions } from "typeorm";

createConnection();

// interface IOptions {
//   host: string;
// }

// console.log("DATABASE Running")
// getConnectionOptions().then(options => {
// 	const newOptions = options as IOptions;
// 	newOptions.host = "database_ignite"; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
// 	createConnection({
// 		...options,
// 	});
// });