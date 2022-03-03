import { container } from "tsyringe";

import { Request, Response } from "express";

import { UploardCarImagesUseCase } from "./UploardCarImagesUseCase";

interface IFiles {
   filename: string;
}

class UploardCarImagesController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const images = request.files as IFiles[];
      
		const uploadCarImagesUseCase = container.resolve(UploardCarImagesUseCase);
      
		const images_name = images.map(file => file.filename);
      
		await uploadCarImagesUseCase.execute({
			car_id: id,
			images_name
		});
      
		return response.status(201).send();
	}
}

export { UploardCarImagesController };

