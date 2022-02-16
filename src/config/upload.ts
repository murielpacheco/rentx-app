import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export default {
   
	upload(folder: string) { 
		return {
			storage: multer.diskStorage({ // storage: multer.diskStorage para passar infos tipo: destino, nome do arquivo, etc
				destination: resolve(__dirname, "..", "..", folder), // destino do arquivo utilizando resolve do node
				filename: (request, file, callback) => { // func para definir o nome do arquivo
					const fileHash = crypto.randomBytes(16).toString("hex"); // lib crypto para gerar um hash aleatório
					const filename = `${fileHash}-${file.originalname}`; // concatena o hash com o nome do arquivo
               
					return callback(null, filename); // o callback retorna 2 parâmetros: erro e o nome do arquivo, 
				}
			})
		};
	}
};